import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export const CheckoutCancel: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-xl w-full text-center"
      >
        <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-[32px] flex items-center justify-center mx-auto mb-10">
          <XCircle className="text-red-500" size={48} />
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">Payment Cancelled</h1>
        <p className="text-xl text-white/60 mb-12 leading-relaxed">
          The checkout process was cancelled. No charges were made to your account.
        </p>

        <div className="grid gap-4">
          <Link 
            to="/marketplace" 
            className="w-full bg-white text-black py-5 rounded-2xl font-bold text-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={24} />
            Try Again
          </Link>
          <Link 
            to="/" 
            className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={24} />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
};
