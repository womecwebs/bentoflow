import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Template } from "../data/templates";
import { TemplateCard } from "../components/marketplace/TemplateCard";
import {
  ShoppingBag,
  Sparkles,
  Filter,
  Loader2,
  Search,
  X,
  ArrowRight,
} from "lucide-react";
import { MetaTags } from "../components/seo/MetaTags";

export const Marketplace: React.FC = () => {
  const [category, setCategory] = useState<string>("All");
  const [showOnlyPremium, setShowOnlyPremium] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "SaaS Dashboards",
    "Modern Portfolios",
    "Waitlist Pages",
    "Minimalist Grids",
  ];

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("templates")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Map DB schema to UI interface
        const mappedTemplates: Template[] = (data || []).map((t) => {
          const configData = t.config_json ||
            t.config_data || { boxes: [], config: {} };
          return {
            id: t.id,
            name: t.name,
            price_usd: t.price || 0,
            is_premium: t.is_premium,
            difficulty: t.difficulty || "Normal",
            type: t.type || "grid",
            category: t.category,
            download_available: t.download_available || false,
            config_data: {
              boxes: configData.boxes || [],
              config: {
                columns: configData.config?.columns || 12,
                gap: configData.config?.gap || 16,
                radius: configData.config?.radius || 12,
                autoFlow: configData.config?.autoFlow || "row",
              },
            },
            config_json: {
              html: configData.html || configData.html_content,
              html_content: configData.html_content,
              full_code: configData.full_code,
            },
          };
        });

        setTemplates(mappedTemplates);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter((t) => {
    const matchesCategory = category === "All" || t.category === category;
    const matchesPremium = !showOnlyPremium || t.is_premium;

    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.type.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesPremium && matchesSearch;
  });

  const pageTitle =
    category === "All"
      ? "Template Marketplace - BentoFlow"
      : `Best ${category} Bento Grid Templates - BentoFlow`;

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-24">
      <MetaTags
        title={pageTitle}
        description={`Unlock high-performance, production-ready ${category !== "All" ? category : ""} Bento grid layouts. From minimalist portfolios to complex SaaS dashboards, find the perfect template for your next project.`}
        keywords="bento grid, tailwind css, react templates, dashboard layouts, portfolio templates, grid builder, bento design"
      />
      {/* Header */}
      <section className="pt-24 pb-16 px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Sparkles size={16} />
                Template Marketplace
              </div>
              <h1 className="text-6xl font-bold tracking-tighter mb-6">
                Premium Bento <br /> Grid Templates.
              </h1>
              <p className="text-xl text-white/60 leading-relaxed">
                Unlock high-performance, production-ready layouts for your next
                project. From minimalist portfolios to complex SaaS dashboards.
              </p>
            </div>

            <div className="flex flex-col items-end gap-6">
              <a
                href="mailto:joshaffilly@gmail.com?subject=Inquiry for Custom Bento Design, website designs and development - BentoFlow"
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/90 transition-all shadow-xl shadow-white/5"
              >
                Hire a Designer
                <ArrowRight size={18} />
              </a>

              <div className="relative group w-full md:w-80">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald-400 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Bar */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    category === cat
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={showOnlyPremium}
                  onChange={(e) => setShowOnlyPremium(e.target.checked)}
                />
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${showOnlyPremium ? "bg-emerald-500" : "bg-white/10"}`}
                />
                <div
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${showOnlyPremium ? "translate-x-6" : "translate-x-0"}`}
                />
              </div>
              <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">
                Show Only Premium
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-zinc-900/50 border border-white/5 rounded-4xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-4/3 bg-white/5" />
                  <div className="p-8 space-y-4">
                    <div className="h-8 bg-white/5 rounded-lg w-3/4" />
                    <div className="h-4 bg-white/5 rounded-lg w-1/2" />
                    <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((j) => (
                          <div
                            key={j}
                            className="w-8 h-8 rounded-full bg-white/5 border-2 border-zinc-900"
                          />
                        ))}
                      </div>
                      <div className="h-3 bg-white/5 rounded-lg w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingBag className="mx-auto text-white/20 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white/40">
                No templates found
              </h3>
              <p className="text-white/20">
                Try adjusting your filters or check back later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-8">
        <div className="max-w-7xl mx-auto bg-emerald-500 rounded-[48px] p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 relative z-10">
            Have a design to share? <br /> Join our creator program.
          </h2>
          <button className="bg-black text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-zinc-900 transition-all relative z-10">
            Apply as Creator
          </button>
        </div>
      </section>
    </main>
  );
};
