import React from "react";
import { createPortal } from "react-dom";
import {
  ShoppingCart,
  ShieldCheck,
  Zap,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { ClickPesaButton } from "../payments/ClickPesaButton";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    id: string;
    name: string;
    price_usd: number;
  };
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  template,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/payments/clickpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          amount: template.price_usd, // Convert to TZS for mock
          currency: "TZS",
          itemId: template.id,
          userId: user?.id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // In a real app, redirect to ClickPesa hosted checkout
        // For this demo, we simulate success after a delay
        setTimeout(() => {
          setIsLoading(false);
          onSuccess();
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Checkout failed", error);
      setIsLoading(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
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
            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-4xl p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500 to-blue-500" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                <ShoppingCart className="text-emerald-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Unlock Pro Template
                </h2>
                <p className="text-white/40 text-sm">
                  Get full access to the source code and commercial license.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/60">Template</span>
                <span className="text-white font-bold">{template.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Price</span>
                <span className="text-2xl font-bold text-emerald-400">
                  ${template.price_usd}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <ShieldCheck size={18} className="text-emerald-400" />
                Commercial Usage License
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Zap size={18} className="text-emerald-400" />
                One-click Export to Tailwind/React
              </div>
            </div>

            {/* Replace the old <form> with this */}
            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/40 text-sm">Item</span>
                  <span className="text-white font-medium">
                    {template.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm">Amount</span>
                  <span className="text-emerald-400 font-bold text-xl">
                    ${template.price_usd}
                  </span>
                </div>
              </div>

              {/* Using your specialized ClickPesa component */}
              <ClickPesaButton
                amount={template.price_usd}
                currency="USD"
                templateId={template.id}
                onSuccess={() => {
                  // This triggers the download unlock in the parent
                  onSuccess();
                  onClose();
                }}
              />
            </div>

            {/* <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                  ClickPesa Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="2557XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Complete Purchase
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form> */}

            <p className="text-center text-[10px] text-white/20 mt-6 uppercase tracking-widest">
              Secure payment powered by ClickPesa
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
