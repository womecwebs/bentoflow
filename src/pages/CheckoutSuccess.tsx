import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const CheckoutSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const gridId = searchParams.get('id');
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const recordSale = async () => {
      if (!gridId || !user) {
        setProcessing(false);
        return;
      }

      try {
        // 1. Fetch grid details
        const { data: grid, error: gridError } = await supabase
          .from('community_grids')
          .select('*')
          .eq('id', gridId)
          .single();

        if (gridError) throw gridError;
        if (!grid) throw new Error('Grid not found');

        // 2. Check if sale already recorded (idempotency)
        const { data: existingSale } = await supabase
          .from('sales')
          .select('id')
          .eq('buyer_id', user.id)
          .eq('grid_id', gridId)
          .single();

        if (existingSale) {
          setProcessing(false);
          return;
        }

        // 3. Calculate shares
        const amount = grid.price;
        const platformFee = amount * 0.15;
        const sellerShare = amount * 0.85;

        // 4. Record sale
        const { error: saleError } = await supabase
          .from('sales')
          .insert([{
            buyer_id: user.id,
            seller_id: grid.user_id,
            grid_id: gridId,
            amount,
            platform_fee: platformFee,
            seller_share: sellerShare
          }]);

        if (saleError) throw saleError;

        // 5. Update seller balance via RPC
        const { error: rpcError } = await supabase.rpc('increment_balance', {
          user_id: grid.user_id,
          amount: sellerShare
        });

        if (rpcError) throw rpcError;

      } catch (err: any) {
        console.error('Error recording sale:', err);
        setError(err.message);
      } finally {
        setProcessing(false);
      }
    };

    recordSale();
  }, [gridId, user]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#050505] flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-[48px] p-12 text-center"
      >
        {processing ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="text-emerald-500 animate-spin" size={48} />
            <h1 className="text-2xl font-bold text-white">Processing Purchase...</h1>
            <p className="text-white/60 text-sm">Please wait while we secure your template.</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="text-red-500" size={40} />
            </div>
            <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
            <p className="text-white/60 text-sm">{error}</p>
            <button
              onClick={() => navigate('/community')}
              className="w-full bg-white text-black py-4 rounded-2xl font-bold mt-4"
            >
              Back to Gallery
            </button>
          </div>
        ) : (
          <>
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="text-emerald-500" size={40} />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
            <p className="text-white/60 mb-10">
              Your premium template has been unlocked. You can now remix it and use it in your projects.
            </p>

            <button
              onClick={() => navigate('/community')}
              className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
            >
              Back to Gallery
              <ArrowRight size={20} />
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};
