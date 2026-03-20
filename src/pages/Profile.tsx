import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, TrendingUp, History, ArrowUpRight, Loader2, DollarSign, Smartphone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface ProfileData {
  balance: number;
  sites_created: number;
  is_pro: boolean;
  community_designs_count: number;
  total_earnings: number;
}

interface Sale {
  id: string;
  amount: number;
  seller_share: number;
  created_at: string;
  grid_id: string;
  community_grids: {
    title: string;
  };
}

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [payoutStatus, setPayoutStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const MIN_PAYOUT = 50;

  useEffect(() => {
    if (user) {
      fetchProfileData();
      fetchSalesHistory();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('balance, sites_created, is_pro')
        .eq('id', user?.id)
        .single();

      if (profileError) throw profileError;

      const { count, error: countError } = await supabase
        .from('community_grids')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      if (countError) throw countError;

      const { data: salesData, error: salesError } = await supabase
        .from('sales')
        .select('seller_share')
        .eq('seller_id', user?.id);

      if (salesError) throw salesError;

      const totalEarnings = salesData?.reduce((acc, sale) => acc + (sale.seller_share || 0), 0) || 0;

      setProfile({
        ...profileData,
        community_designs_count: count || 0,
        total_earnings: totalEarnings
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const fetchSalesHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('sales')
        .select(`
          *,
          community_grids (
            title
          )
        `)
        .eq('seller_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSales(data || []);
    } catch (err) {
      console.error('Error fetching sales:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayoutRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    const amount = parseFloat(payoutAmount);
    if (isNaN(amount) || amount <= 0 || amount > profile.balance) {
      alert('Invalid payout amount');
      return;
    }

    setPayoutStatus('loading');
    try {
      const { error } = await supabase
        .from('payout_requests')
        .insert([{
          user_id: user.id,
          amount,
          payment_method: 'ClickPesa/Mobile Money',
          account_number: accountNumber,
          status: 'pending'
        }]);

      if (error) throw error;

      // Deduct from balance (optimistic or real)
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ balance: profile.balance - amount })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setPayoutStatus('success');
      setProfile({ ...profile, balance: profile.balance - amount });
      setTimeout(() => {
        setShowPayoutModal(false);
        setPayoutStatus('idle');
        setPayoutAmount('');
        setAccountNumber('');
      }, 2000);
    } catch (err) {
      console.error('Error requesting payout:', err);
      setPayoutStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="text-emerald-500 animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Stats & Earnings */}
          <div className="flex-1 space-y-8">
            <header>
              <h1 className="text-4xl font-bold text-white mb-2">Designer Dashboard</h1>
              <p className="text-white/40">Manage your earnings and track your marketplace performance.</p>
            </header>

            {/* Earnings Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900 border border-white/10 rounded-[32px] p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Wallet size={120} className="text-emerald-500" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-emerald-400 mb-4">
                  <DollarSign size={20} />
                  <span className="text-sm font-bold uppercase tracking-wider">Available Balance</span>
                </div>
                
                <div className="text-6xl font-bold text-white mb-8">
                  ${profile?.balance?.toFixed(2) || '0.00'}
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="relative group">
                    <button 
                      onClick={() => setShowPayoutModal(true)}
                      disabled={!profile?.balance || profile.balance < MIN_PAYOUT}
                      className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Request Payout
                      <ArrowUpRight size={20} />
                    </button>
                    {profile?.balance !== undefined && profile.balance < MIN_PAYOUT && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-zinc-800 border border-white/10 rounded-lg text-[10px] text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Minimum payout is ${MIN_PAYOUT}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-6 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="text-center">
                      <div className="text-white/40 text-[10px] uppercase font-bold mb-1">Total Sales</div>
                      <div className="text-white font-bold">{sales.length}</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                      <div className="text-white/40 text-[10px] uppercase font-bold mb-1">Earnings</div>
                      <div className="text-white font-bold">${profile?.total_earnings?.toFixed(2) || '0.00'}</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                      <div className="text-white/40 text-[10px] uppercase font-bold mb-1">Published</div>
                      <div className="text-white font-bold">{profile?.community_designs_count || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sales History */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <History size={20} className="text-emerald-500" />
                  Recent Sales
                </h2>
              </div>

              <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] overflow-hidden">
                {sales.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {sales.map((sale) => (
                      <div key={sale.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                        <div>
                          <h3 className="text-white font-medium mb-1">{sale.community_grids?.title || 'Untitled Grid'}</h3>
                          <p className="text-white/40 text-xs">{new Date(sale.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-400 font-bold">+${sale.seller_share.toFixed(2)}</div>
                          <div className="text-white/20 text-[10px]">Net Earnings</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp size={24} className="text-white/20" />
                    </div>
                    <p className="text-white/40">No sales yet. Share your designs to start earning!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Info/Tips */}
          <div className="w-full md:w-80 space-y-6">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6">
              <h3 className="text-emerald-400 font-bold mb-2">Designer Tips</h3>
              <ul className="text-sm text-emerald-400/70 space-y-3">
                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  High-quality previews lead to 3x more sales.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  Share your profile on social media.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  Keep your templates updated with new styles.
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6">
              <h3 className="text-white font-bold mb-4">Payout Info</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Platform Fee</span>
                  <span className="text-white">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Min. Payout</span>
                  <span className="text-white">${MIN_PAYOUT.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Processing</span>
                  <span className="text-white">1-3 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPayoutModal(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[40px] p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Request Payout</h2>
            <p className="text-white/40 text-sm mb-8">Funds will be sent via ClickPesa/Mobile Money.</p>

            <form onSubmit={handlePayoutRequest} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Amount to Withdraw</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    type="number"
                    step="0.01"
                    required
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <p className="text-[10px] text-white/20 mt-2">Max available: ${profile?.balance?.toFixed(2)}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Mobile Money Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="+255..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={payoutStatus === 'loading' || payoutStatus === 'success'}
                className="w-full bg-emerald-500 text-black py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {payoutStatus === 'loading' ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : payoutStatus === 'success' ? (
                  'Request Sent!'
                ) : (
                  'Confirm Payout'
                )}
              </button>

              {payoutStatus === 'error' && (
                <p className="text-red-400 text-xs text-center">Failed to send request. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
