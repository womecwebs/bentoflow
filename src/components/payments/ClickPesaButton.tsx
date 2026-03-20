import React, { useState } from "react";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "../../lib/supabase"; // Ensure this path is correct

interface ClickPesaButtonProps {
  amount: number;
  currency: string;
  templateId: string; // We need this to tell the server what we are buying
  onSuccess?: (data?: any) => void;
}

export const ClickPesaButton: React.FC<ClickPesaButtonProps> = ({
  amount,
  currency,
  templateId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // 1. Get the current user session from Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // If no session, the user isn't logged in
      if (!session) {
        window.location.href = "/login";
        return;
      }

      // 2. Send the request to your backend
      const response = await fetch("/api/payments/clickpesa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          itemId: templateId,
        }),
      });

      // --- THE NEW SMART LOGIC STARTS HERE ---
      const data = await response.json();
      console.log("Frontend received:", data); // This helps you see what ClickPesa sent

      if (data.success) {
        // This line checks for 'checkout_url' OR 'url' in case ClickPesa changed the name
        const redirectUrl = data.checkout_url || data.url;

        if (redirectUrl) {
          if (onSuccess) onSuccess(data);
          console.log("Redirecting to ClickPesa:", redirectUrl);
          window.location.href = redirectUrl; // This opens the hosted payment page
        } else {
          console.error("Link missing. Full data received:", data);
          alert(
            "Payment confirmed, but the redirect link is missing. Check your server terminal.",
          );
        }
      } else {
        // This handles cases where success is false (e.g. invalid API key)
        console.error("Payment Init Error:", data);
        alert(`Error: ${data.error || "Could not initialize payment"}`);
      }
      // --- THE NEW SMART LOGIC ENDS HERE ---
    } catch (error) {
      console.error("Connection error:", error);
      alert(
        "Failed to connect to the server. Make sure your backend (server.ts) is running.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        <>
          <div className="flex items-center gap-2">
            <CreditCard size={20} />
            Pay with Card or Mobile Money
          </div>
          <span className="text-[10px] opacity-70 uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck size={10} /> Secure International Checkout
          </span>
        </>
      )}
    </button>
  );
};
