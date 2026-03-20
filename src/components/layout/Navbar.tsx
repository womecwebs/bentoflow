import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, ShoppingBag, Wrench, Sparkles, Github, Menu, X, LogOut, User as UserIcon, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
 
export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  
  const navItems = [
    { name: 'Editor', path: '/editor', icon: LayoutGrid },
    { name: 'Bento Editor', path: '/bento-editor', icon: LayoutGrid },
    { name: 'AI Generator', path: '/generator', icon: Sparkles },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Profile', path: '/profile', icon: UserIcon },
    { name: 'Tools', path: '/tools', icon: Wrench },
    { name: 'Blog', path: '/blog', icon: Globe },
    { name: 'SEO Guide', path: '/seo-guide', icon: Globe },
  ];

  return (
    <nav className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 sticky top-0 z-[60]">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
          <LayoutGrid className="text-black" size={18} />
        </div>
        <span className="font-bold text-lg md:text-xl tracking-tight text-white">BentoFlow <span className="text-emerald-500">Pro</span></span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 text-sm font-medium transition-colors whitespace-nowrap ${
              location.pathname === item.path ? 'text-emerald-400' : 'text-white/60 hover:text-white'
            }`}
          >
            <item.icon size={14} />
            {item.name}
          </Link>
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <Link 
              to="/profile"
              className="group relative flex items-center justify-center w-9 h-9 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <UserIcon size={16} className="text-emerald-400" />
              <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-y-1 group-hover:translate-y-0 whitespace-nowrap z-50">
                <span className="text-xs text-white/80 font-medium">Profile: {user.email}</span>
              </div>
            </Link>
            <button 
              onClick={() => signOut()}
              className="p-2 text-white/40 hover:text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <>
            <a href="https://github.com" className="text-white/40 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <Link 
              to="/login"
              className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/90 transition-all"
            >
              Sign In
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 bg-[#050505] z-[9999] lg:hidden flex flex-col p-8 pb-24 gap-8 animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 text-xl font-bold transition-colors ${
                  location.pathname === item.path ? 'text-emerald-400' : 'text-white/60 hover:text-white'
                }`}
              >
                <item.icon size={24} />
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="h-px bg-white/10" />
          
          <div className="flex flex-col gap-4">
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                  <UserIcon size={20} className="text-emerald-400" />
                  <span className="text-lg text-white/80 font-medium truncate">{user.email}</span>
                </div>
                <button 
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-500/10 text-red-400 px-6 py-4 rounded-2xl text-center font-bold text-lg hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="bg-emerald-500 text-black px-6 py-4 rounded-2xl text-center font-bold text-lg hover:bg-emerald-400 transition-all"
              >
                Sign In
              </Link>
            )}
            <a 
              href="https://github.com" 
              className="flex items-center justify-center gap-3 text-white/60 hover:text-white transition-colors py-4"
            >
              <Github size={24} />
              View on GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
