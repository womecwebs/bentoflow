import React from "react";
import { useNavigate } from "react-router-dom";
import { useGrid } from "../../context/GridContext";
import { Template } from "../../data/templates";
import { Zap, LayoutGrid, ArrowRight, Globe, Eye } from "lucide-react";
import { motion } from "motion/react";
import { BentoPreview } from "./BentoPreview";
import { DownloadButton } from "./DownloadButton";

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const navigate = useNavigate();
  const { loadTemplate } = useGrid();

  const handleCustomize = () => {
    loadTemplate(template);
    navigate("/editor");
  };

  const handlePreview = () => {
    navigate(`/preview/${template.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-zinc-900 border border-white/10 rounded-4xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500"
    >
      <div className="aspect-video relative overflow-hidden bg-zinc-950 border-b border-white/5">
        <BentoPreview
          boxes={template.config_data.boxes}
          config={template.config_data.config}
          html={
            template.config_json?.html || template.config_json?.html_content
          }
        />

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 backdrop-blur-sm gap-4">
          <button
            onClick={handlePreview}
            className="w-full bg-zinc-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
          >
            <Eye size={20} />
            Live Preview
          </button>

          <button
            onClick={handleCustomize}
            className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75"
          >
            <LayoutGrid size={20} />
            Customize in Editor
            <ArrowRight size={20} />
          </button>

          <DownloadButton
            template={template}
            className="w-full bg-emerald-500 text-white py-4 rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150"
          />
        </div>

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {template.is_premium && (
            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-emerald-500/20">
              <Zap size={10} fill="currentColor" />
              Premium
            </div>
          )}
          {template.category && (
            <div className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
              {template.category.split(" ")[0]}
            </div>
          )}
          {template.type === "website" && (
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-blue-500/20">
              <Globe size={10} />
              Website
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
              {template.name}
            </h3>
            <span
              className={`text-[10px] font-mono uppercase tracking-widest ${
                template.difficulty === "Advanced"
                  ? "text-orange-400"
                  : template.difficulty === "Normal"
                    ? "text-blue-400"
                    : "text-emerald-400"
              }`}
            >
              {template.difficulty} Complexity
            </span>
          </div>
          <div className="text-right">
            <div
              className={`text-3xl font-bold ${template.is_premium ? "text-emerald-400" : "text-white"}`}
            >
              {template.price_usd === 0 ? "Free" : `$${template.price_usd}`}
            </div>
            {template.is_premium && (
              <div className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">
                One-time payment
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-6 border-t border-white/5">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={`https://picsum.photos/seed/user${i}/32/32`}
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          <span className="text-xs text-white/40 font-medium">
            Used by 1.2k+ developers
          </span>
        </div>
      </div>
    </motion.div>
  );
};
