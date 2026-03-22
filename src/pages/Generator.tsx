import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Sparkles,
  Loader2,
  Eye,
  Code,
  Smartphone,
  LayoutGrid,
  AlertCircle,
  Save,
  FolderOpen,
  Trash2,
  Github,
  Download,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import {
  generateWebsite,
  WebsiteProject,
} from "../services/aiGeneratorService";
import { ProModal } from "../components/generator/ProModal";
import { MetaTags } from "../components/seo/MetaTags";
import { ProjectViewer } from "../components/generator/ProjectViewer";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const Generator: React.FC = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentProject, setCurrentProject] = useState<WebsiteProject | null>(
    null,
  );
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [profile, setProfile] = useState<{
    sites_created: number;
    is_pro: boolean;
  } | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchProjects();

      const params = new URLSearchParams(window.location.search);
      if (params.get("payment") === "success") {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
        fetchProfile();
      }
    } else {
      setProfile(null);
      setIsProfileLoading(false);
    }
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const response = await fetch("/api/projects", {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });

      const data = await response.json();

      // FIX: Ensure data is an array before setting it
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error("Backend did not return an array:", data);
        setProjects([]); // Set to empty list so it doesn't crash
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setProjects([]); // Safety fallback
    }
  };

  const saveProject = async (project: WebsiteProject) => {
    if (!user) return;
    setIsSaving(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(project),
      });
      const data = await response.json();
      if (data.success) {
        fetchProjects();
      }
    } catch (err) {
      console.error("Error saving project:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const loadProject = async (id: string) => {
    if (!user) return;
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const response = await fetch(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      const data = await response.json();
      setCurrentProject(data);
    } catch (err) {
      console.error("Error loading project:", err);
    }
  };

  const deleteProject = async (id: string) => {
    if (!user) return;
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleSyncGithub = async () => {
    if (!user || !currentProject) return;
    setIsSyncing(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const response = await fetch("/api/github/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(currentProject),
      });
      const data = await response.json();
      alert(data.message);
    } catch (err) {
      console.error("Error syncing to GitHub:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDownloadZip = async () => {
    if (!currentProject) return;
    const zip = new JSZip();
    currentProject.files.forEach((file) => {
      zip.file(file.name, file.content);
    });
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(
      content,
      `${(currentProject.name || "project").toLowerCase().replace(/\s+/g, "_")}_project.zip`,
    );
  };

  const fetchProfile = async () => {
    if (!user) return;
    setIsProfileLoading(true);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("sites_created, is_pro")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        // Check if column is missing
        if (error.message.includes('column "sites_created" does not exist')) {
          setError(
            'Database schema mismatch: "sites_created" column is missing. Please run the SQL migration.',
          );
          throw error;
        }
        throw error;
      }

      if (!data) {
        // Profile doesn't exist, create one
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id,
              email: user.email,
              sites_created: 0,
              is_pro: false,
            },
          ])
          .select("sites_created, is_pro")
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
      } else {
        setProfile(data);
      }
    } catch (err: any) {
      console.error("Error fetching/creating profile:", err);
      if (!error)
        setError(
          "Failed to load user profile. Please ensure you have run the SQL migration in Supabase.",
        );
    } finally {
      setIsProfileLoading(false);
    }
  };

  const isLimitReached =
    profile && profile.sites_created >= 2 && !profile.is_pro;

  const handleGenerate = async () => {
    if (!user) {
      setError("You must be logged in to generate pages.");
      return;
    }

    if (!profile && !isProfileLoading) {
      setError("Profile not found. Please try refreshing or contact support.");
      return;
    }

    if (isProfileLoading) return;

    // Check limit gate
    if (isLimitReached) {
      setIsProModalOpen(true);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const project = await generateWebsite(prompt);
      setCurrentProject(project);

      // Save project to server
      await saveProject(project);

      // Increment sites_created in Supabase
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ sites_created: (profile?.sites_created || 0) + 1 })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // Update local profile state
      setProfile((prev) =>
        prev ? { ...prev, sites_created: prev.sites_created + 1 } : null,
      );
    } catch (err: any) {
      console.error("Generation failed:", err);
      setError(err.message || "Failed to generate website. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isProfileLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          <p className="text-zinc-500 animate-pulse">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  if (error && !currentProject) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-white font-bold mb-2">Workspace Error</h2>
          <p className="text-red-400 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-black px-6 py-2 rounded-xl font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#050505] text-white p-4 md:p-8">
      <MetaTags
        title="AI Website Builder"
        description="Build multi-file websites with AI. Features live preview, code inspection, and ZIP export."
      />

      {!user ? (
        <div className="max-w-md mx-auto mt-20 text-center space-y-6 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
            <AlertCircle className="text-emerald-500" size={40} />
          </div>
          <h2 className="text-2xl font-bold">Authentication Required</h2>
          <p className="text-white/60">
            Please log in to your BentoFlow Pro account to use the AI Website
            Builder.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
          >
            Sign In to Continue
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          {/* Input Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                    <Sparkles className="text-emerald-500" size={20} />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">AI Website Builder</h1>
                    <p className="text-xs text-white/40 uppercase tracking-widest">
                      BentoFlow Pro
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {currentProject && (
                    <>
                      <button
                        onClick={handleDownloadZip}
                        className="p-2 text-white/40 hover:text-white transition-colors"
                        title="Download ZIP"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={handleSyncGithub}
                        disabled={isSyncing}
                        className="p-2 text-white/40 hover:text-white transition-colors disabled:opacity-50"
                        title="Sync to GitHub"
                      >
                        {isSyncing ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : (
                          <Github size={18} />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your website (e.g., 'A modern SaaS website with multiple pages, a dark theme, and emerald accents...')"
                    className="w-full h-48 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 transition-all resize-none glassmorphic shadow-inner"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={
                    isGenerating ||
                    isProfileLoading ||
                    (!prompt.trim() && !isLimitReached)
                  }
                  className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                    isGenerating ||
                    isProfileLoading ||
                    (!prompt.trim() && !isLimitReached)
                      ? "bg-white/5 text-white/40 cursor-not-allowed"
                      : isLimitReached
                        ? "bg-emerald-500 text-black hover:bg-emerald-600 shadow-emerald-500/20"
                        : "bg-emerald-500 text-black hover:bg-emerald-600 shadow-emerald-500/20"
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Building Website...
                    </>
                  ) : isProfileLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Loading Profile...
                    </>
                  ) : isLimitReached ? (
                    <>
                      <Zap size={20} fill="currentColor" />
                      Upgrade to Pro
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} fill="currentColor" />
                      Magic Generate
                    </>
                  )}
                </button>

                {profile && !profile.is_pro && (
                  <div className="flex items-center justify-between px-2 pt-2">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
                      Free Projects: {profile.sites_created}/2
                    </span>
                    {profile.sites_created >= 2 && (
                      <button
                        onClick={() => setIsProModalOpen(true)}
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 uppercase tracking-widest font-bold flex items-center gap-1"
                      >
                        Unlock Pro <Zap size={10} fill="currentColor" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Projects List */}
            <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen size={16} className="text-white/40" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
                  Recent Projects
                </h3>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/5">
                {projects.length === 0 ? (
                  <p className="text-[10px] text-white/20 italic">
                    No projects yet
                  </p>
                ) : (
                  projects.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between group"
                    >
                      <button
                        onClick={() => loadProject(p.id)}
                        className="flex-1 text-left text-xs text-white/60 hover:text-white transition-colors truncate"
                      >
                        {p.name}
                      </button>
                      <button
                        onClick={() => deleteProject(p.id)}
                        className="p-1 text-white/0 group-hover:text-white/20 hover:text-red-400 transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* native banner ads adsterra */}
            {/* Wrap in a container with a fixed minimum height to prevent layout shift */}
            {!profile?.is_pro && (
              <div className="mt-8 p-4 bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden">
                <p className="text-[9px] text-white/20 uppercase tracking-widest mb-2">
                  Recommended
                </p>
                <div className="min-h-50 flex items-center justify-center">
                  <div id="container-645e86c75d5ab52d304b27cf26736b30"></div>
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-8 h-[calc(100vh-12rem)]">
            {currentProject ? (
              <ProjectViewer
                project={currentProject}
                onSyncGithub={handleSyncGithub}
              />
            ) : (
              <div className="h-full bg-zinc-900/30 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <LayoutGrid className="text-white/10" size={40} />
                </div>
                <h2 className="text-xl font-bold text-white/40 mb-2">
                  No Project Selected
                </h2>
                <p className="text-sm text-white/20 max-w-xs">
                  Describe your website on the left and click 'Build Website' to
                  start your next project.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />

      {/* Templates Section */}
      <div className="max-w-7xl mx-auto mt-24 pb-20">
        <div className="flex items-center justify-between mb-8">
          {/* native banner ads adsterra */}
          <div id="container-645e86c75d5ab52d304b27cf26736b30"></div>
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Premium & Free Templates
            </h2>
            <p className="text-white/40 text-sm">
              Start with a professionally designed layout and customize it with
              AI.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="text-emerald-400 text-sm font-bold hover:underline"
          >
            View All Templates
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              name: "SaaS Enterprise",
              type: "Premium",
              color: "emerald",
              prompt:
                "Generate a complete Enterprise SaaS website with Home, About, Services (Pricing), Blog, Contact, and Legal pages. Use a dark zinc theme with emerald accents and glassmorphism.",
            },
            {
              name: "Creative Agency",
              type: "Premium",
              color: "purple",
              prompt:
                "Generate a complete Creative Agency website with Home, Mission, Services, Case Studies (Blog), and Contact pages. Use bold typography and vibrant purple accents.",
            },
            {
              name: "Fintech Dashboard",
              type: "Premium",
              color: "blue",
              prompt:
                "Generate a complete Fintech platform website with Home, Security (About), Pricing, News, and Contact pages. Use a clean, professional blue and white theme.",
            },
            {
              name: "AI Startup",
              type: "Premium",
              color: "cyan",
              prompt:
                "Generate a complete AI Startup website with Home, Technology (About), Solutions, Research (Blog), and Contact pages. Use futuristic cyan glow effects.",
            },
            {
              name: "Modern Portfolio",
              type: "Free",
              color: "zinc",
              prompt:
                "Generate a complete personal portfolio website with Home, Bio, Services, Blog, and Contact pages. Use a minimal, high-contrast aesthetic.",
            },
            {
              name: "E-commerce Store",
              type: "Premium",
              color: "rose",
              prompt:
                "Generate a complete E-commerce brand website with Home, Our Story, Shop (Services), Blog, and Contact pages. Use warm rose tones.",
            },
            {
              name: "Health & Wellness",
              type: "Free",
              color: "teal",
              prompt:
                "Generate a complete Health & Wellness website with Home, Philosophy, Programs, Articles, and Contact pages. Use calming teal and cream colors.",
            },
            {
              name: "Real Estate Pro",
              type: "Premium",
              color: "amber",
              prompt:
                "Generate a complete Real Estate website with Home, About Us, Listings (Services), Market News, and Contact pages. Use sophisticated amber and dark themes.",
            },
            {
              name: "Education Platform",
              type: "Free",
              color: "indigo",
              prompt:
                "Generate a complete Education platform website with Home, Mission, Courses, Blog, and Contact pages. Use professional indigo accents.",
            },
            {
              name: "Mobile App Landing",
              type: "Free",
              color: "orange",
              prompt:
                "Generate a complete Mobile App landing page with Home, Features, Pricing, Blog, and Contact pages. Use energetic orange accents.",
            },
          ].map((template, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => setPrompt(template.prompt)}
            >
              <div
                className={`h-32 bg-linear-to-br from-${template.color}-500/20 to-transparent flex items-center justify-center`}
              >
                <LayoutGrid
                  className={`text-${template.color}-500/40 group-hover:scale-110 transition-transform`}
                  size={40}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold truncate">
                    {template.name}
                  </h3>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                      template.type === "Premium"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {template.type}
                  </span>
                </div>
                <p className="text-[10px] text-white/30">
                  Click to use as base prompt
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
