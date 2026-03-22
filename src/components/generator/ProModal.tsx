import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async () => {
    setIsPaying(true);
    setError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("You must be logged in to upgrade.");
      }

      const response = await fetch("/api/payments/upgrade-pro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err: any) {
      console.error("Upgrade error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 blur-[100px]" />

            <button
              onClick={onClose}
              disabled={isPaying}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <Zap
                  className="text-emerald-500"
                  size={32}
                  fill="currentColor"
                />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Unlock Unlimited AI Power
              </h2>
              <p className="text-white/60 mb-8">
                You've reached your limit of 2 free generations. Upgrade to Pro
                for unlimited high-performance landing pages.
              </p>

              {error && (
                <div className="w-full mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex flex-col items-center gap-3 text-red-400 text-sm text-center">
                  <AlertCircle size={24} className="shrink-0" />
                  <p className="font-medium">{error}</p>
                  <p className="text-[10px] text-red-400/60 uppercase tracking-widest">
                    Configuration Required
                  </p>
                </div>
              )}

              <div className="w-full space-y-4 mb-8">
                {[
                  "Unlimited AI Generations",
                  "Tailwind CSS 4 Optimized",
                  "Premium Bento Layouts",
                  "Priority Support",
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-white/80"
                  >
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={handleUpgrade}
                disabled={isPaying}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPaying ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    Upgrade to Pro for $15
                    <Zap
                      size={18}
                      fill="currentColor"
                      className="group-hover:scale-120 transition-transform"
                    />
                  </>
                )}
              </button>

              <p className="text-[10px] text-white/30 mt-4 uppercase tracking-widest">
                One-time payment • Lifetime access
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
