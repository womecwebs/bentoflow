import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, User, ExternalLink, DollarSign, ShoppingCart, Crown, TrendingUp, Loader2, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface CommunityCardProps {
  grid: {
    id: string;
    title: string;
    image_url: string;
    upvotes: number;
    slug: string;
    grid_json: string;
    category: string;
    is_for_sale: boolean;
    price: number;
    is_promoted: boolean;
    user_id: string;
    allow_hiring?: boolean;
    profiles: {
      full_name?: string;
      avatar_url: string;
      email?: string;
    };
  };
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ grid }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [upvotes, setUpvotes] = useState(grid.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [isPromoting, setIsPromoting] = useState(false);
  const [promoteSuccess, setPromoteSuccess] = useState(false);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/login');
      return;
    }
    if (hasUpvoted || isUpvoting) return;

    setIsUpvoting(true);
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
    } finally {
      setIsUpvoting(false);
    }
  };

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (grid.is_for_sale) {
      // ClickPesa Integration
      const returnUrl = `${window.location.origin}/checkout/success?id=${grid.id}`;
      const clickPesaUrl = `https://pay.clickpesa.com/pay?amount=${grid.price}&currency=USD&reference=${grid.id}&description=BentoFlow Template: ${grid.title}&return_url=${encodeURIComponent(returnUrl)}`;
      window.open(clickPesaUrl, '_blank');
    } else {
      // Remix logic - Navigate to the new Bento Remix tool
      navigate('/tools/bento-remix', { state: { remixCode: grid.grid_json, remixPrompt: grid.title } });
    }
  };

  const handlePromote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;

    setIsPromoting(true);
    try {
      // Simulate payment for promotion ($5 for 24h)
      const promotedUntil = new Date();
      promotedUntil.setHours(promotedUntil.getHours() + 24);

      const { error } = await supabase
        .from('community_grids')
        .update({ 
          is_promoted: true,
          promoted_until: promotedUntil.toISOString()
        })
        .eq('id', grid.id);

      if (error) throw error;
      setPromoteSuccess(true);
      setTimeout(() => setPromoteSuccess(false), 3000);
    } catch (err) {
      console.error('Promotion failed:', err);
    } finally {
      setIsPromoting(false);
    }
  };

  const isOwner = user?.id === grid.user_id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className={`group relative bg-zinc-900/50 border ${grid.is_promoted ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-white/10'} rounded-[32px] overflow-hidden backdrop-blur-xl transition-all hover:border-emerald-500/30 shadow-2xl`}
    >
      <Link to={`/gallery/${grid.slug}`}>
        {/* Preview Image */}
        <div className="aspect-[4/3] overflow-hidden relative">
          <img 
            src={grid.image_url} 
            alt={grid.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <div className="flex gap-2 w-full">
              <button 
                onClick={handleAction}
                className={`flex-1 ${grid.is_for_sale ? 'bg-emerald-500 text-black' : 'bg-white text-black'} py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all`}
              >
                {grid.is_for_sale ? (
                  <>
                    <ShoppingCart size={14} />
                    Buy Template (${grid.price})
                  </>
                ) : (
                  <>
                    <Zap size={14} />
                    Remix Design
                  </>
                )}
              </button>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-colors">
                <ExternalLink size={14} />
              </div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {grid.is_promoted && (
              <div className="px-3 py-1 bg-emerald-500 text-black rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-emerald-500/20">
                <Crown size={10} />
                Promoted
              </div>
            )}
            <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60">
              {grid.category}
            </div>
          </div>

          {grid.is_for_sale && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-500/30 text-[10px] font-bold text-emerald-500">
              ${grid.price}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-bold text-lg truncate group-hover:text-emerald-400 transition-colors">
                {grid.title}
              </h3>
              {grid.allow_hiring && (
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">Available for Hire</span>
                </div>
              )}
            </div>
            <button 
              onClick={handleUpvote}
              disabled={hasUpvoted}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                hasUpvoted 
                  ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' 
                  : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Heart size={14} fill={hasUpvoted ? 'currentColor' : 'none'} />
              <span className="text-xs font-bold">{upvotes}</span>
            </button>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center overflow-hidden">
                {grid.profiles?.avatar_url ? (
                  <img 
                    src={grid.profiles.avatar_url} 
                    alt={grid.profiles.full_name} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <User size={14} className="text-emerald-500" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/20 uppercase font-bold tracking-wider">Creator</span>
                <span className="text-xs text-white/60 font-medium">{grid.profiles?.full_name || grid.profiles?.email?.split('@')[0] || 'Anonymous'}</span>
              </div>
            </div>

            {isOwner && !grid.is_promoted && (
              <button 
                onClick={handlePromote}
                disabled={isPromoting || promoteSuccess}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  promoteSuccess 
                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                    : 'bg-white/5 text-white/40 border border-white/10 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/30'
                }`}
              >
                {isPromoting ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : promoteSuccess ? (
                  <Check size={12} />
                ) : (
                  <TrendingUp size={12} />
                )}
                {promoteSuccess ? 'Promoted' : 'Promote ($5)'}
              </button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
