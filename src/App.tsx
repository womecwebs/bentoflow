import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Editor } from './pages/Editor';
import { Marketplace } from './pages/Marketplace';
import { Preview } from './pages/Preview';
import { ToolsSuite } from './pages/ToolsSuite';
import { SEOContent } from './pages/SEOContent';
import { ToolDetail } from './pages/ToolDetail';
import { AIBentoBuilder } from './pages/AIBentoBuilder';
import { BentoRemix } from './pages/BentoRemix';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { CheckoutCancel } from './pages/CheckoutCancel';
import { Login } from './pages/Login';
import { Generator } from './pages/Generator';
import { ImageBentoEditor } from './pages/ImageBentoEditor';
import { CommunityGallery } from './pages/CommunityGallery';
import { SingleGridPage } from './pages/SingleGridPage';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';
import BlogHub from './pages/BlogHub';
import BlogPost from './pages/BlogPost';
import { Footer } from './components/layout/Footer';
import { GridProvider } from './context/GridContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function AppContent() {
  const { isConfigured } = useAuth();

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Configuration Required</h1>
          <p className="text-zinc-400 mb-8">
            To start using BentoFlow, you need to connect your Supabase project.
          </p>
          
          <div className="space-y-4 text-left">
            <div className="bg-black/50 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-sm font-semibold text-emerald-400 mb-2 uppercase tracking-wider">Step 1: Get Keys</h3>
              <p className="text-sm text-zinc-500">
                Go to your <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Supabase Dashboard</a> &rarr; Project Settings &rarr; API.
              </p>
            </div>
            
            <div className="bg-black/50 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-sm font-semibold text-emerald-400 mb-2 uppercase tracking-wider">Step 2: Add Secrets</h3>
              <p className="text-sm text-zinc-500">
                Open <strong>Settings</strong> (⚙️ gear icon) &rarr; <strong>Secrets</strong> and add:
              </p>
              <ul className="mt-2 space-y-1 text-xs font-mono text-zinc-400">
                <li>• VITE_SUPABASE_URL</li>
                <li>• VITE_SUPABASE_ANON_KEY</li>
                <li>• SUPABASE_SERVICE_ROLE_KEY</li>
              </ul>
            </div>
          </div>
          
          <p className="mt-8 text-xs text-zinc-600">
            The app will automatically rebuild once secrets are saved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/editor" 
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/marketplace" 
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/preview/:id" 
          element={
            <ProtectedRoute>
              <Preview />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/generator" 
          element={
            <ProtectedRoute>
              <Generator />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/bento-editor" 
          element={
            <ProtectedRoute>
              <ImageBentoEditor />
            </ProtectedRoute>
          } 
        />
        <Route path="/tools" element={<ToolsSuite />} />
        <Route path="/tools/ai-bento-grid-builder" element={<AIBentoBuilder />} />
        <Route path="/tools/bento-remix" element={<BentoRemix />} />
        <Route path="/community" element={<CommunityGallery />} />
        <Route path="/gallery/:slug" element={<SingleGridPage />} />
        <Route path="/seo-guide" element={<SEOContent />} />
        <Route path="/tools/:slug" element={<ToolDetail />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/blog" element={<BlogHub />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <GridProvider>
        <Router>
          <AppContent />
        </Router>
      </GridProvider>
    </AuthProvider>
  );
}
