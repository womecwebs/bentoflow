import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Loader2, Sparkles, LayoutGrid, ArrowRight, ChevronDown, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { CommunityCard } from '../components/community/CommunityCard';
import { PublishBentoModal } from '../components/community/PublishBentoModal';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';

export const CommunityGallery: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [grids, setGrids] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const GRIDS_PER_PAGE = 12;

  useEffect(() => {
    fetchGrids(true);
  }, [searchQuery, category]);

  const fetchGrids = async (reset = false) => {
    if (reset) {
      setIsLoading(true);
      setPage(0);
    } else {
      setIsFetchingMore(true);
    }

    try {
      let query = supabase
        .from('community_grids')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url,
            email
          )
        `)
        .order('is_promoted', { ascending: false })
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      if (category !== 'All') {
        query = query.eq('category', category);
      }

      const from = reset ? 0 : (page + 1) * GRIDS_PER_PAGE;
      const to = from + GRIDS_PER_PAGE - 1;

      const { data, error } = await query.range(from, to);

      if (error) throw error;

      if (reset) {
        setGrids(data || []);
      } else {
        setGrids(prev => [...prev, ...(data || [])]);
        setPage(prev => prev + 1);
      }

      setHasMore(data?.length === GRIDS_PER_PAGE);
    } catch (err) {
      console.error('Error fetching grids:', err);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  const categories = ['All', 'SaaS', 'Portfolio', 'eCommerce', 'Other'];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Helmet>
        <title>Community Gallery | BentoFlow Pro</title>
        <meta name="description" content="Explore stunning Bento grid layouts created by the community. Remix and build your own high-conversion designs." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles size={14} />
            Community Showcase
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            The Bento <span className="text-emerald-500">Flow</span> Gallery
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            Explore, upvote, and remix high-conversion bento layouts designed by our pro community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex justify-center mb-12"
          >
            <button
              onClick={() => {
                if (!user) {
                  navigate('/login');
                } else {
                  setIsPublishModalOpen(true);
                }
              }}
              className="group relative px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition-all flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Plus size={20} />
              Publish Your Design
            </button>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 p-2 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input 
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none py-4 pl-14 pr-6 text-white focus:outline-none placeholder:text-white/20"
              />
            </div>
            
            <div className="h-px md:h-10 w-full md:w-px bg-white/10 my-auto" />
            
            <div className="relative group min-w-[160px]">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent border-none py-4 px-6 text-white focus:outline-none appearance-none cursor-pointer font-bold text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-zinc-900">{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-zinc-900/50 rounded-[32px] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : grids.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {grids.map((grid) => (
                  <CommunityCard key={grid.id} grid={grid} />
                ))}
              </AnimatePresence>
            </div>

            {hasMore && (
              <div className="mt-16 text-center">
                <button
                  onClick={() => fetchGrids()}
                  disabled={isFetchingMore}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all flex items-center gap-3 mx-auto disabled:opacity-50"
                >
                  {isFetchingMore ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Loading More...
                    </>
                  ) : (
                    <>
                      Load More Designs
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-zinc-900/20 rounded-[40px] border border-dashed border-white/10">
            <LayoutGrid size={48} className="mx-auto text-white/10 mb-4" />
            <h3 className="text-xl font-bold text-white/40">No designs found</h3>
            <p className="text-white/20 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </section>

      {/* Featured Creators Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Creators</h2>
            <p className="text-white/40">The minds behind the most popular layouts</p>
          </div>
          <Link to="/marketplace" className="text-emerald-500 text-sm font-bold hover:underline">
            View Marketplace
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {grids.slice(0, 6).map((grid, i) => (
            <motion.div
              key={`creator-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col items-center p-6 bg-zinc-900/30 rounded-[32px] border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 p-1 mb-4 group-hover:scale-110 transition-transform">
                <img 
                  src={grid.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${grid.profiles?.full_name || grid.profiles?.email}`} 
                  alt={grid.profiles?.full_name || 'Creator'}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-sm font-bold text-white/80 group-hover:text-emerald-400 transition-colors truncate w-full text-center">
                {grid.profiles?.full_name || grid.profiles?.email?.split('@')[0] || 'Creator'}
              </span>
              <span className="text-[10px] text-white/20 uppercase font-black tracking-widest mt-1">
                {grid.category} Expert
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <PublishBentoModal 
        isOpen={isPublishModalOpen}
        onClose={() => {
          setIsPublishModalOpen(false);
          fetchGrids(true); // Refresh gallery after publish
        }}
        gridJson="" // Empty for now, will add code field to modal
        previewRef={{ current: null }}
      />
    </div>
  );
};
