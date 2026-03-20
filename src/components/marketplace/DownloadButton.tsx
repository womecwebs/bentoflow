import React, { useState, useEffect } from "react";
import { Download, Lock, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { Template } from "../../data/templates";
import { CheckoutModal } from "./CheckoutModal";

interface DownloadButtonProps {
  template: Template;
  className?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  template,
  className = "",
}) => {
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const checkPurchase = async () => {
      if (!user || !template.is_premium) return;

      const { data } = await supabase
        .from("purchases")
        .select("id")
        .eq("user_id", user.id)
        .eq("template_id", template.id)
        .eq("status", "completed")
        .maybeSingle();

      if (data) {
        setHasPurchased(true);
      }
    };

    checkPurchase();
  }, [user, template.id, template.is_premium]);

  const generateDownload = () => {
    const { config_data } = template;
    const { boxes, config } = config_data;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name} - BentoFlow Export</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #050505; color: white; margin: 0; padding: 2rem; font-family: sans-serif; }
        .bento-grid {
            display: grid;
            grid-template-columns: repeat(${config?.columns || 12}, 1fr);
            gap: ${config?.gap || 16}px;
            grid-auto-flow: ${config?.autoFlow || "row"};
        }
        .bento-item {
            border-radius: ${config?.radius || 12}px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            min-height: 100px;
            transition: transform 0.2s ease;
        }
        .bento-item:hover {
            transform: scale(1.02);
        }
    </style>
</head>
<body>
    <div class="max-w-7xl mx-auto">
        <header class="mb-12">
            <h1 class="text-5xl font-bold mb-2 tracking-tighter">${template.name}</h1>
            <p class="text-white/40 uppercase tracking-widest text-xs font-mono">Exported from BentoFlow Pro</p>
        </header>
        
        <div class="bento-grid">
            ${boxes
              .map(
                (box) => `
            <div class="bento-item" style="grid-column: span ${box.w}; grid-row: span ${box.h}; background-color: ${box.color};">
                <h3 class="font-bold text-lg">${box.title}</h3>
            </div>
            `,
              )
              .join("")}
        </div>

        <footer class="mt-20 pt-8 border-t border-white/10 text-center">
            <p class="text-white/20 text-sm">Generated with BentoFlow Pro Template Engine</p>
        </footer>
    </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(template.name || "template").toLowerCase().replace(/\s+/g, "-")}-bento.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAction = async () => {
    if (!template.is_premium || hasPurchased) {
      generateDownload();
      return;
    }

    if (!user) {
      alert("Please sign in to purchase templates.");
      return;
    }

    setIsChecking(true);
    try {
      // Re-verify purchase status just in case
      const { data } = await supabase
        .from("purchases")
        .select("id")
        .eq("user_id", user.id)
        .eq("template_id", template.id)
        .eq("status", "completed")
        .maybeSingle();

      if (data) {
        setHasPurchased(true);
        generateDownload();
      } else {
        setIsCheckoutOpen(true);
      }
    } catch (error) {
      console.error("Error checking purchase:", error);
      setIsCheckoutOpen(true);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAction}
        disabled={isChecking}
        className={`flex items-center justify-center gap-2 font-bold transition-all active:scale-[0.98] ${className}`}
      >
        {isChecking ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            {!template.is_premium || hasPurchased ? (
              <>
                <Download size={20} />
                Download HTML
              </>
            ) : (
              <>
                <Lock size={20} />
                Unlock to Download
              </>
            )}
          </>
        )}
      </button>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        template={{
          id: template.id,
          name: template.name,
          price_usd: template.price_usd,
        }}
        onSuccess={() => {
          setHasPurchased(true);
          generateDownload();
        }}
      />
    </>
  );
};
