import React from "react";
import { BentoBox, GridConfig } from "../../types";
import {
  BarChart3,
  Image as ImageIcon,
  LayoutGrid,
  Smartphone,
  Accessibility,
  MousePointer2,
} from "lucide-react";

interface BentoPreviewProps {
  boxes: BentoBox[];
  config: GridConfig;
  toolSlug?: string;
  html?: string;
}

export const BentoPreview: React.FC<BentoPreviewProps> = ({
  boxes,
  config,
  toolSlug,
  html,
}) => {
  // We'll use a fixed scale for the preview
  const scale = 0.25;

  const isDense = toolSlug === "magic-bento-auto-layout";

  if (html) {
    return (
      <div className="w-full h-full overflow-hidden relative">
        <iframe
          // BentoPreview.tsx - Change the iframe head
          srcDoc={`
  <html>
    <head>
      <style>
        /* This pulls the styles from your main site into the preview */
        body { margin: 0; padding: 0; background: transparent; overflow: hidden; }
        ${Array.from(document.styleSheets)
          .filter(
            (sheet) =>
              !sheet.href || sheet.href.includes(window.location.origin),
          )
          .map((sheet) => {
            try {
              return Array.from(sheet.cssRules)
                .map((rule) => rule.cssText)
                .join("");
            } catch (e) {
              return "";
            }
          })
          .join("")}
      </style>
    </head>
    <body>${html}</body>
  </html>
`}
          className="w-[500%] h-[500%] border-none scale-[0.2] origin-top-left pointer-events-none"
          title="Preview"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full bg-black/40 overflow-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${config?.columns || 12}, 1fr)`,
        gridAutoFlow: isDense ? "dense" : "row",
        gridAutoRows: isDense ? "20px" : "auto",
        gap: `${(config?.gap || 16) * scale}px`,
        padding: `${(config?.gap || 16) * scale}px`,
      }}
    >
      {boxes.map((box, index) => (
        <div
          key={box.id}
          className="relative group/box flex items-center justify-center overflow-hidden"
          style={{
            gridColumn: `span ${box.w}`,
            gridRow: `span ${box.h}`,
            backgroundColor: box.color,
            borderRadius: `${(config?.radius || 12) * scale}px`,
            opacity: 0.8,
            backdropFilter:
              toolSlug === "ios-control-center-bento-style"
                ? "blur(20px)"
                : "none",
            border:
              toolSlug === "ios-control-center-bento-style"
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : "none",
          }}
        >
          {toolSlug === "bento-grid-a11y-checker" && (
            <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg border border-white/20">
              {index + 1}
            </div>
          )}
          {toolSlug === "bento-dashboard-ui-kit" && (
            <BarChart3 size={16} className="text-white/20" />
          )}
          {toolSlug === "bento-portfolio-wireframer" && (
            <ImageIcon size={16} className="text-white/20" />
          )}
          {toolSlug === "magic-bento-auto-layout" && (
            <MousePointer2 size={12} className="text-white/20" />
          )}
          {![
            "bento-grid-a11y-checker",
            "bento-dashboard-ui-kit",
            "bento-portfolio-wireframer",
            "magic-bento-auto-layout",
          ].includes(toolSlug || "") && (
            <div className="w-1/2 h-1 bg-white/10 rounded-full" />
          )}
        </div>
      ))}

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: `${100 / (config?.columns || 12)}% 20px`,
          }}
        />
      </div>
    </div>
  );
};
