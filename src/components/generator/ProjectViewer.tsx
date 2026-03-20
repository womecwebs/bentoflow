import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Eye, FileCode, Copy, Check, Download, Github } from 'lucide-react';
import { WebsiteProject, ProjectFile } from '../../services/aiGeneratorService';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface ProjectViewerProps {
  project: WebsiteProject;
  onSyncGithub?: () => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({ project, onSyncGithub }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [activeFile, setActiveFile] = useState<ProjectFile>(project.files[0]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveFile(project.files[0]);
  }, [project]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    project.files.forEach(file => {
      zip.file(file.name, file.content);
    });
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${(project.name || 'project').toLowerCase().replace(/\s+/g, '_')}_project.zip`);
  };

  const generatePreviewHtml = () => {
    const indexFile = project.files.find(f => f.name === 'index.html');
    const styleFile = project.files.find(f => f.name === 'style.css');
    const scriptFile = project.files.find(f => f.name === 'script.js');

    if (!indexFile) return '<h1>No index.html found</h1>';

    let html = indexFile.content;

    // Inject styles and scripts if they are not already linked
    if (styleFile && !html.includes('style.css')) {
      html = html.replace('</head>', `<style>${styleFile.content}</style></head>`);
    }
    if (scriptFile && !html.includes('script.js')) {
      html = html.replace('</body>', `<script>${scriptFile.content}</script></body>`);
    }

    return html;
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-bottom border-white/10 bg-black/20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'preview' ? 'bg-emerald-500 text-black' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Eye size={16} />
            Live Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'code' ? 'bg-emerald-500 text-black' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Code size={16} />
            Show Code
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            title="Download Project ZIP"
          >
            <Download size={20} />
          </button>
          <button
            onClick={onSyncGithub}
            className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            title="Sync to GitHub"
          >
            <Github size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'preview' ? (
          <div className="w-full h-full bg-white">
            <iframe
              title="Preview"
              srcDoc={generatePreviewHtml()}
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-forms"
            />
          </div>
        ) : (
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-48 border-right border-white/10 bg-black/20 p-4 space-y-2">
              <h3 className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-4">Files</h3>
              {project.files.map(file => (
                <button
                  key={file.name}
                  onClick={() => setActiveFile(file)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                    activeFile.name === file.name ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
                >
                  <FileCode size={14} />
                  {file.name}
                </button>
              ))}
            </div>

            {/* Editor */}
            <div className="flex-1 relative bg-black/40">
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all z-10"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
              <pre className="p-6 text-sm font-mono text-white/80 overflow-auto h-full scrollbar-thin scrollbar-thumb-white/10">
                <code>{activeFile.content}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
