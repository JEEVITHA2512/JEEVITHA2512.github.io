import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { FolderSimple, ArrowSquareOut, ArrowLeft, MagnifyingGlass, Funnel } from "@phosphor-icons/react";
import { FaGithub } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { Component as LumaSpin } from "@/components/ui/luma-spin";
import { portfolioData } from "@/data/portfolioData";
import BorderGlow from "@/components/ui/BorderGlow";
import { Button } from "@/components/ui/button";

type ProjectData = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  github: string | null;
  tags: string[];
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Fetch all projects
  const { data: projects = [], isLoading } = useQuery<ProjectData[]>({
    queryKey: ["projects"],
    queryFn: () => portfolioData.projects
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Dynamically extract and count all tags from database projects
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    // Sort tags by frequency (highest count first)
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [projects]);

  // Filter projects in real-time by search query and tag selection
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || project.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [projects, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-background text-foreground bg-grid-pattern relative overflow-x-clip selection:bg-primary/30 selection:text-foreground">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          
          {/* Header & Back Navigation */}
          <div className="space-y-6">
            <Link href="/">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </span>
            </Link>

            <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider text-foreground">
                  Projects Archive
                </h1>
                <p className="text-muted-foreground text-sm font-semibold tracking-wide">
                  A comprehensive directory of my technical work, prototypes, and research.
                </p>
              </div>

              {/* Live Count Badge */}
              <div className="shrink-0 flex items-center gap-2 self-start md:self-end">
                <span className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xs font-extrabold tracking-wider uppercase">
                  {filteredProjects.length} {filteredProjects.length === 1 ? "Project" : "Projects"}
                </span>
              </div>
            </div>
          </div>

          {/* Filtering & Search Panel */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Search Input Box */}
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                <MagnifyingGlass className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search projects, stack, or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-4 py-3 bg-card border border-border rounded-xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary tactile-shadow placeholder:text-muted-foreground/60 transition-all"
                style={{ paddingLeft: "2.75rem" }}
              />
            </div>

            {/* Tag Cloud Filter Panel */}
            <div className="md:col-span-8 flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2 text-xs font-extrabold text-muted-foreground/60 uppercase tracking-wide mr-2 py-2">
                <Funnel className="w-4 h-4" />
                Filter:
              </div>

              {/* All Option */}
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedTag === null
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                All ({projects.length})
              </button>

              {/* Dynamic tag buttons */}
              {tagCounts.map(([tag, count]) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  <span>{tag}</span>
                  <span className={`text-[10px] ${selectedTag === tag ? "opacity-90 text-primary-foreground" : "text-muted-foreground/60"}`}>
                    ({count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Projects Showcases */}
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-6">
              <LumaSpin />
              <p className="text-muted-foreground font-semibold uppercase tracking-wide text-xs animate-pulse">Fetching archive...</p>
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center border border-dashed border-border/80 rounded-[2rem] bg-card/20 space-y-3"
            >
              <FolderSimple className="w-12 h-12 text-muted-foreground/40 mx-auto" />
              <p className="font-extrabold text-foreground text-lg">No projects available</p>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                There are no projects added to the archive yet. Please check back later.
              </p>
            </motion.div>
          ) : filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center border border-dashed border-border/80 rounded-[2rem] bg-card/20 space-y-3"
            >
              <FolderSimple className="w-12 h-12 text-muted-foreground/40 mx-auto" />
              <p className="font-extrabold text-foreground text-lg">No projects match your filter</p>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                Try resetting your search query or clicking on another tag filter pill.
              </p>
              <div className="pt-2">
                <Button
                  variant="admin-pill"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id || index}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="h-full group"
                  >
                    <BorderGlow
                      className="tactile-shadow tactile-hover h-full w-full transition-transform duration-300 group-hover:-translate-y-1"
                      borderRadius={24}
                      backgroundColor="var(--card)"
                      colors={['var(--primary)', 'rgba(134,249,249,0.3)']}
                    >
                      <div className="flex flex-col rounded-[24px] overflow-hidden bg-card hover:bg-card/50 transition-colors h-full relative z-10">
                        
                        {/* Cover Image */}
                        <div className="h-44 w-full overflow-hidden relative bg-black/5 dark:bg-white/5 border-b border-border/50">
                          {project.image ? (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent z-10 opacity-50 group-hover:opacity-30 transition-opacity duration-300" />
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                              />
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center relative">
                              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                              <FolderSimple className="w-12 h-12 text-primary/30 transform group-hover:scale-110 group-hover:text-primary/50 transition-all duration-500" />
                            </div>
                          )}
                        </div>

                        {/* Card Content Details */}
                        <div className="flex flex-col p-6 flex-grow">
                          
                          {/* Header row */}
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                              {project.title}
                            </h3>
                            <div className="flex gap-1.5 shrink-0">
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-foreground transition-colors p-1 bg-foreground/5 dark:bg-white/5 rounded-lg border border-border/30 hover:border-border"
                                  aria-label="GitHub Repository"
                                >
                                  <FaGithub className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-foreground transition-colors p-1 bg-foreground/5 dark:bg-white/5 rounded-lg border border-border/30 hover:border-border"
                                  aria-label="External Link"
                                >
                                  <ArrowSquareOut className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground text-[13px] leading-relaxed mb-6 flex-grow line-clamp-4">
                            {project.description}
                          </p>

                          {/* Tech stack badges */}
                          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40 mt-auto">
                            {project.tags.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 bg-foreground/5 dark:bg-white/5 text-foreground/80 dark:text-white/80 rounded-md text-[10px] font-bold tracking-wide border border-border/30 group-hover:border-primary/20 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                        </div>
                      </div>
                    </BorderGlow>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
