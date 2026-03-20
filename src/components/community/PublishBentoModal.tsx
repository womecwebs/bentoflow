import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Loader2, CheckCircle, AlertCircle, Globe, DollarSign, Briefcase, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { toPng, toBlob } from 'html-to-image';

interface PublishBentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  gridJson: string;
  previewRef: React.RefObject<HTMLDivElement>;
}

export const PublishBentoModal: React.FC<PublishBentoModalProps> = ({ isOpen, onClose, gridJson, previewRef }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('SaaS');
  const [isForSale, setIsForSale] = useState(false);
  const [price, setPrice] = useState('0.00');
  const [allowHiring, setAllowHiring] = useState(false);
  const [imageMode, setImageMode] = useState<'upload' | 'url' | 'manual'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [gridCode, setGridCode] = useState('');
  
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'checking' | 'uploading' | 'saving' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [publishCount, setPublishCount] = useState(0);
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      checkProStatus();
    }
  }, [isOpen, user]);

  const checkProStatus = async () => {
    if (!user) return;
    setStatus('checking');
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_pro, last_published_at')
        .eq('id', user.id)
        .single();
      
      const { count } = await supabase
        .from('community_grids')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setIsPro(profile?.is_pro || false);
      setPublishCount(count || 0);
      setLastPublishedAt(profile?.last_published_at || null);
      setStatus('idle');
    } catch (err) {
      console.error('Error checking status:', err);
      setStatus('idle');
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
  };

  const handlePublish = async () => {
    // Honeypot check
    if (honeypot) {
      console.warn('Bot detected via honeypot');
      return;
    }

    // 1. Get latest user session
    const { data: { user: latestUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !latestUser) {
      setError('You must be signed in to publish.');
      return;
    }

    // Rate limiting check (1 minute for free users, 10 seconds for pro)
    if (lastPublishedAt) {
      const lastTime = new Date(lastPublishedAt).getTime();
      const now = new Date().getTime();
      const diff = now - lastTime;
      const limit = isPro ? 10000 : 60000;

      if (diff < limit) {
        const remaining = Math.ceil((limit - diff) / 1000);
        setError(`Please wait ${remaining} seconds before publishing again.`);
        return;
      }
    }

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    // Pro check
    if (!isPro && publishCount >= 3) {
      setError('Free users are limited to 3 community publishes. Upgrade to Pro for unlimited sharing!');
      return;
    }

    setIsPublishing(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the Secrets panel.');
      setIsPublishing(false);
      setStatus('error');
      return;
    }

    try {
      let finalImageUrl = imageUrl;
      const finalGridJson = gridJson || gridCode;

      if (!finalGridJson.trim()) {
        throw new Error('Please provide the Bento Grid code');
      }

      if (imageMode === 'upload') {
        setStatus('uploading');
        // 1. Capture Screenshot from hidden div or previewRef
        if (!previewRef.current) throw new Error('Preview not found');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        try {
          const blob = await toBlob(previewRef.current, {
            cacheBust: true,
            backgroundColor: '#050505',
            pixelRatio: 2, // Higher quality for OG
            width: 1200,
            height: 630,
          });

          if (!blob) throw new Error('Failed to generate preview image');

          const fileName = `${latestUser.id}/${Date.now()}.png`;
          let uploadData, uploadError;
          try {
            const { data, error } = await supabase.storage
              .from('grid-previews')
              .upload(fileName, blob, {
                contentType: 'image/png',
                upsert: true
              });
            uploadData = data;
            uploadError = error;
          } catch (storageErr: any) {
            console.error('Storage upload exception:', storageErr);
            alert(`Storage Upload Failed: ${storageErr.message || 'Unknown error'}`);
            throw storageErr;
          }

          if (uploadError) {
            alert(`Supabase Storage Error: ${uploadError.message}`);
            throw uploadError;
          }

          const { data: { publicUrl } } = supabase.storage
            .from('grid-previews')
            .getPublicUrl(fileName);
          
          finalImageUrl = publicUrl;
        } catch (imageErr: any) {
          console.error('Image generation/upload failed:', imageErr);
          throw new Error(`Failed to generate or upload preview image: ${imageErr.message || 'Unknown error'}. This can happen if your design contains external images with restricted access.`);
        }
      } else if (imageMode === 'manual') {
        if (!selectedFile) throw new Error('Please select an image file');
        setStatus('uploading');
        
        const fileName = `${latestUser.id}/${Date.now()}-${selectedFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('grid-previews')
          .upload(fileName, selectedFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('grid-previews')
          .getPublicUrl(fileName);
        
        finalImageUrl = publicUrl;
      } else if (!imageUrl.trim()) {
        throw new Error('Please enter an image URL');
      }

      // 3. Save to community_grids table
      setStatus('saving');
      const slug = generateSlug(title);

      const { error: dbError } = await supabase
        .from('community_grids')
        .insert([{
          user_id: latestUser.id,
          title,
          description,
          category,
          image_url: finalImageUrl,
          grid_json: finalGridJson,
          slug,
          is_for_sale: isForSale,
          price: isForSale ? parseFloat(price) : 0,
          allow_hiring: allowHiring
        }]);

      if (dbError) throw dbError;

      // 4. Increment sites_created and update last_published_at
      await supabase.rpc('increment_sites_created', { user_id: latestUser.id });
      
      // Update last_published_at
      await supabase
        .from('profiles')
        .update({ 
          last_published_at: new Date().toISOString()
        })
        .eq('id', latestUser.id);
      
      // Fallback if RPC is not defined
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('sites_created')
          .eq('id', latestUser.id)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({ sites_created: (profile.sites_created || 0) + 1 })
            .eq('id', latestUser.id);
        }
      } catch (e) {
        // Fallback failed, but we already updated last_published_at
      }

      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setTitle('');
        setDescription('');
        setIsForSale(false);
        setPrice('0.00');
        setAllowHiring(false);
        // Refresh to show new design
        window.location.reload();
      }, 2000);

    } catch (err: any) {
      console.error('Publishing failed:', err);
      setError(err.message || 'Failed to publish grid');
      setStatus('error');
    } finally {
      setIsPublishing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-zinc-900 border border-white/10 rounded-[32px] w-full max-w-xl overflow-hidden shadow-2xl"
        >
          <div className="p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                  <Globe className="text-emerald-500" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Publish Bento Grid</h2>
                  <p className="text-xs text-white/40 uppercase tracking-widest">
                    {!user ? 'Authentication Required' : (isPro ? 'Pro Member' : `${3 - publishCount} free publishes remaining`)}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {!user ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <AlertCircle className="text-emerald-500" size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Please Sign In</h3>
                  <p className="text-white/60">You need to be logged in to share your designs with the community.</p>
                </div>
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="px-8 py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all"
                >
                  Sign In Now
                </button>
              </div>
            ) : status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle className="text-emerald-500" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white">Published Successfully!</h3>
                <p className="text-white/60">Your design is now live in the community gallery.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <div className="hidden" aria-hidden="true">
                  <input 
                    type="text" 
                    value={honeypot} 
                    onChange={(e) => setHoneypot(e.target.value)} 
                    tabIndex={-1} 
                    autoComplete="off"
                  />
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Title</label>
                    <input 
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Modern SaaS Dashboard"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none"
                    >
                      <option value="SaaS">SaaS</option>
                      <option value="Portfolio">Portfolio</option>
                      <option value="eCommerce">eCommerce</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell the community about your design choices..."
                    className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                  />
                </div>

                {!gridJson && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Bento Code (TSX/JSON)</label>
                    <textarea 
                      value={gridCode}
                      onChange={(e) => setGridCode(e.target.value)}
                      placeholder="Paste your bento grid React code here..."
                      className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-xs font-mono text-emerald-500/80 focus:outline-none focus:border-emerald-500/50 transition-all resize-none custom-scrollbar"
                    />
                  </div>
                )}

                {/* Image Handling */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Preview Image</label>
                  <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                    {previewRef.current && (
                      <button 
                        onClick={() => setImageMode('upload')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${imageMode === 'upload' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
                      >
                        <ImageIcon size={14} />
                        Auto
                      </button>
                    )}
                    <button 
                      onClick={() => setImageMode('manual')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${imageMode === 'manual' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
                    >
                      <Upload size={14} />
                      Upload
                    </button>
                    <button 
                      onClick={() => setImageMode('url')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${imageMode === 'url' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
                    >
                      <LinkIcon size={14} />
                      URL
                    </button>
                  </div>

                  {imageMode === 'manual' && (
                    <div className="space-y-4">
                      <div className="relative group">
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full h-32 bg-black/40 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-emerald-500/50 transition-all">
                          {filePreview ? (
                            <img src={filePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                          ) : (
                            <>
                              <Upload className="text-white/20 group-hover:text-emerald-500 transition-colors" size={24} />
                              <span className="text-xs text-white/40">Click or drag to upload preview</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {imageMode === 'url' && (
                    <input 
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.png"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                    />
                  )}
                </div>

                {/* Monetization & Hiring */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-emerald-500" />
                        <span className="text-sm font-bold">For Sale?</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isForSale}
                          onChange={(e) => setIsForSale(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                    
                    {isForSale && (
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                        <input 
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 pl-8 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-emerald-500" />
                        <span className="text-sm font-bold">Allow Hiring?</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={allowHiring}
                          onChange={(e) => setAllowHiring(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                    <p className="text-[10px] text-white/40 leading-relaxed">
                      Enable a "Get in Touch" button for potential clients to hire you.
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}

                <button 
                  onClick={handlePublish}
                  disabled={isPublishing || status === 'checking'}
                  className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all disabled:opacity-50"
                >
                  {isPublishing ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      {status === 'uploading' ? 'Generating OG Image...' : 'Saving to Gallery...'}
                    </>
                  ) : (
                    <>
                      <Upload size={20} />
                      Publish Design
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
