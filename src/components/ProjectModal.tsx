import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FolderSimple, ArrowSquareOut } from "@phosphor-icons/react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  github: string | null;
  tags: string[];
};

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
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
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border/80 shadow-2xl z-10 flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-foreground/5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground rounded-full transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cover image or placeholder header */}
            <div className="h-56 w-full relative bg-muted border-b border-border/50 shrink-0">
              {project.image ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <FolderSimple className="w-16 h-16 text-primary/30" />
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6 flex-grow overflow-y-auto">
              {/* Title & Tagline */}
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-snug">
                  {project.title}
                </h2>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                  Project Overview
                </h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack tags */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                  Tech Stack & Concepts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-foreground/5 dark:bg-white/5 text-foreground/80 dark:text-white/80 rounded-xl text-xs font-bold tracking-wide border border-border/30 whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Links */}
              {(project.github || project.link) && (
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border/40">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button variant="outline" className="gap-2 font-bold cursor-pointer">
                        <FaGithub className="w-4 h-4" />
                        View Repository
                      </Button>
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button variant="default" className="gap-2 font-bold cursor-pointer">
                        <ArrowSquareOut className="w-4 h-4" />
                        Live Demonstration
                      </Button>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
