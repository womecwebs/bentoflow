import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Zap, 
  Share2, 
  User, 
  Calendar, 
  LayoutGrid, 
  Code, 
  Info,
  ChevronRight,
  Home,
  Briefcase,
  DollarSign,
  ShoppingCart,
  X,
  Send,
  Twitter,
  Facebook,
  Link as LinkIcon,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';

export const SingleGridPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [grid, setGrid] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [upvotes, setUpvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchGrid();
    }
  }, [slug]);

  const fetchGrid = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_grids')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url,
            email
          )
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setGrid(data);
      setUpvotes(data.upvotes);
    } catch (err) {
      console.error('Error fetching grid:', err);
      navigate('/community');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpvote = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (hasUpvoted) return;

    try {
      const { error } = await supabase
        .from('community_grids')
        .update({ upvotes: upvotes + 1 })
        .eq('id', grid.id);

      if (error) throw error;
      
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
    } catch (err) {
      console.error('Upvote failed:', err);
    }
  };

  const handleRemix = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Navigate to the new Bento Remix tool
    navigate('/tools/bento-remix', { state: { remixCode: grid.grid_json, remixPrompt: grid.title } });
  };

  const handleBuy = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const clickPesaUrl = `https://pay.clickpesa.com/pay?amount=${grid.price}&currency=USD&reference=${grid.id}&description=BentoFlow Template: ${grid.title}`;
    window.open(clickPesaUrl, '_blank');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      // Construct mailto link
      const subject = encodeURIComponent(`Inquiry about your Bento Grid: ${grid.title}`);
      const body = encodeURIComponent(`Hi ${grid.profiles?.full_name || 'there'},\n\nI saw your design "${grid.title}" on BentoFlow and I'm interested in hiring you.\n\nMessage: ${contactForm.message}\n\nFrom: ${contactForm.name} (${contactForm.email})`);
      const mailtoUrl = `mailto:${grid.profiles?.email}?subject=${subject}&body=${body}`;
      
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Open mail client
      window.location.href = mailtoUrl;
      
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => {
        setIsContactModalOpen(false);
        setSendSuccess(false);
        setContactForm({ name: '', email: '', message: '' });
      }, 2000);
    } catch (err) {
      console.error('Failed to send email:', err);
      setIsSending(false);
    }
  };

  const shareOnTwitter = () => {
    const text = `Check out this awesome Bento Grid design: ${grid.title} by ${grid.profiles?.full_name || grid.profiles?.email?.split('@')[0]}`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!grid) return null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Community",
        "item": `${window.location.origin}/community`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": grid.title,
        "item": window.location.href
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Helmet>
        <title>{`${grid.title} by ${grid.profiles?.full_name || grid.profiles?.email?.split('@')[0] || 'Anonymous'} | BentoFlow Pro`}</title>
        <meta name="description" content={grid.description || `Explore this stunning ${grid.category} bento grid layout.`} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Navigation & Breadcrumbs */}
      <nav className="border-b border-white/5 bg-zinc-900/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/community" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white">
              <ArrowLeft size={20} />
            </Link>
            
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={10} />
              <Link to="/community" className="hover:text-white transition-colors">Community</Link>
              <ChevronRight size={10} />
              <span className="text-white/60">{grid.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleUpvote}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                hasUpvoted 
                  ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' 
                  : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Heart size={16} fill={hasUpvoted ? 'currentColor' : 'none'} />
              <span className="text-sm font-bold">{upvotes}</span>
            </button>
            {grid.is_for_sale ? (
              <button 
                onClick={handleBuy}
                className="px-6 py-2 bg-emerald-500 text-black font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
              >
                <ShoppingCart size={16} />
                Buy Now (${grid.price})
              </button>
            ) : (
              <button 
                onClick={handleRemix}
                className="px-6 py-2 bg-emerald-500 text-black font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Zap size={16} />
                Remix Design
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Full Resolution Image */}
            <div className="aspect-video w-full bg-zinc-900 rounded-[40px] border border-white/10 overflow-hidden shadow-2xl relative group">
              <img 
                src={grid.image_url} 
                alt={grid.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Description Section */}
            <div className="p-8 rounded-[32px] bg-zinc-900/30 border border-white/5 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{grid.title}</h1>
                <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                  {grid.category}
                </div>
              </div>
              <p className="text-white/60 leading-relaxed">
                {grid.description || "No description provided for this design."}
              </p>
            </div>

            {/* Design Details (AEO/GEO Optimization) */}
            <div className="p-8 rounded-[32px] bg-zinc-900/30 border border-white/5 space-y-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Info size={20} className="text-emerald-500" />
                Design Details & Techniques
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <LayoutGrid size={14} />
                    Grid Architecture
                  </h3>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      12-Column Asymmetric CSS Grid
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Dynamic Row Spanning Logic
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Responsive Breakpoint Adaptation
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <Code size={14} />
                    Visual Styling
                  </h3>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Glassmorphism Backdrop Filters
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Framer Motion Entrance Animations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Tailwind CSS Utility-First Styling
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Author Card */}
            <div className="p-8 rounded-[32px] bg-zinc-900/50 border border-white/10 backdrop-blur-xl space-y-6 shadow-2xl">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Designed By</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center overflow-hidden">
                    {grid.profiles?.avatar_url ? (
                      <img src={grid.profiles.avatar_url} alt={grid.profiles.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={32} className="text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{grid.profiles?.full_name || grid.profiles?.email?.split('@')[0] || 'Anonymous'}</h4>
                    <p className="text-xs text-white/40">BentoFlow Pro Member</p>
                  </div>
                </div>
                
                {grid.allow_hiring && (
                  <button 
                    onClick={() => setIsContactModalOpen(true)}
                    className="p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-pulse"
                    title="Hire this designer"
                  >
                    <Briefcase size={20} />
                  </button>
                )}
              </div>
              
              {grid.allow_hiring && (
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-sm font-bold hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Get In Touch
                </button>
              )}
              
              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(grid.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={shareOnTwitter} className="hover:text-white transition-colors"><Twitter size={16} /></button>
                  <button onClick={shareOnFacebook} className="hover:text-white transition-colors"><Facebook size={16} /></button>
                  <button onClick={copyLink} className="hover:text-white transition-colors"><LinkIcon size={16} /></button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-8 rounded-[32px] bg-emerald-500/5 border border-emerald-500/10 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-500/60">
                {grid.is_for_sale ? 'Marketplace' : 'Inspiration'}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {grid.is_for_sale 
                  ? 'This design is available for purchase. Get the full source code and assets.' 
                  : 'Love this layout? You can remix it to use as a starting point for your own project.'}
              </p>
              {grid.is_for_sale ? (
                <button 
                  onClick={handleBuy}
                  className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all"
                >
                  <ShoppingCart size={20} />
                  Buy Template (${grid.price})
                </button>
              ) : (
                <button 
                  onClick={handleRemix}
                  className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all"
                >
                  <Zap size={20} />
                  Start Remixing
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-zinc-900 border border-white/10 rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                      <Briefcase className="text-emerald-500" size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Hire Designer</h2>
                      <p className="text-xs text-white/40 uppercase tracking-widest">Send a message to {grid.profiles?.full_name || grid.profiles?.email?.split('@')[0]}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsContactModalOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {sendSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                      <Send className="text-emerald-500" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="text-white/60">The designer will get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Your Name</label>
                      <input 
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Your Email</label>
                      <input 
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
                      <textarea 
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSending}
                      className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all disabled:opacity-50"
                    >
                      {isSending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
