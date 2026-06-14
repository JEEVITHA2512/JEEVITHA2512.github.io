import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowSquareOut } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

type BlogItem = {
  id: number;
  title: string;
  date: string;
  link: string;
  description: string;
};

type BlogModalProps = {
  post: BlogItem | null;
  onClose: () => void;
};

export function BlogModal({ post, onClose }: BlogModalProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Lock body scroll when modal is open
  useEffect(() => {
    if (post) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [post]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  // Compute theme colors dynamically to inject into iframe's srcDocHtml
  const textColor = isDark ? "#e5e7eb" : "#1f2937";
  const bgColor = isDark ? "#0b0c10" : "#ffffff";
  const linkColor = isDark ? "#64ffda" : "#2563eb";
  const preBg = isDark ? "#1f2937" : "#f3f4f6";
  const preColor = isDark ? "#f3f4f6" : "#111827";
  const borderBlockquote = isDark ? "#64ffda" : "#2563eb";
  const headingColor = isDark ? "#ffffff" : "#111827";
  const hrColor = isDark ? "#374151" : "#e5e7eb";

  const srcDocHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: ${textColor};
            background-color: ${bgColor};
            padding: 1.5rem;
            margin: 0;
          }
          img, figure {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin: 1.5rem auto;
            display: block;
          }
          a {
            color: ${linkColor};
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          pre {
            background-color: ${preBg};
            color: ${preColor};
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 0.9em;
          }
          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
          }
          blockquote {
            border-left: 4px solid ${borderBlockquote};
            margin: 1.5rem 0;
            padding-left: 1rem;
            font-style: italic;
            color: #9ca3af;
          }
          h1, h2, h3, h4 {
            color: ${headingColor};
            margin-top: 2rem;
          }
        </style>
      </head>
      <body>
        <h1>${post.title}</h1>
        <hr style="border: 0; border-top: 1px solid ${hrColor}; margin-bottom: 2rem;">
        <div>${post.description}</div>
      </body>
    </html>
  `;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl h-[85vh] rounded-3xl bg-card border border-border/80 shadow-2xl z-10 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-border/50 flex items-center justify-between shrink-0 bg-card">
            <div className="flex-1 min-w-0 pr-6">
              <h3 className="text-base font-extrabold text-foreground truncate">
                {post.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer">
                  <ArrowSquareOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Open Medium</span>
                </Button>
              </a>
              <button
                onClick={onClose}
                className="p-2 bg-foreground/5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground rounded-full transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* IFrame Viewport */}
          <div 
            className="flex-1 w-full relative"
            style={{ backgroundColor: bgColor }}
          >
            <iframe
              srcDoc={srcDocHtml}
              title={post.title}
              className="w-full h-full border-none"
              sandbox="allow-popups allow-scripts allow-same-origin"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
