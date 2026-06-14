import { useState } from "react";
import { motion } from "framer-motion";
import { FolderSimple, ArrowSquareOut } from "@phosphor-icons/react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { portfolioData } from "@/data/portfolioData";
import BorderGlow from "@/components/ui/BorderGlow";
import { ProjectModal } from "@/components/ProjectModal";

type ProjectData = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  github: string | null;
  tags: string[];
};

export function Projects({ id }: { id: string }) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { data: projects = [], isLoading } = useQuery<ProjectData[]>({
    queryKey: ["projects"],
    queryFn: () => portfolioData.projects
  });

  if (isLoading) return null;

  return (
    <section id={id} className="pt-10 pb-4">
      <div className="space-y-8">
        
        {/* Standardized Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-b border-border pb-4"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-foreground">
            Featured Projects
          </h2>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <BorderGlow className="tactile-shadow" borderRadius={32} backgroundColor="hsl(var(--card))" colors={['var(--primary)']}>
              <div className="p-8 md:p-12 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden min-h-[260px] w-full z-10">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                
                <div className="p-4 bg-primary/10 text-primary rounded-full relative shrink-0 animate-bounce">
                  <span className="text-4xl" role="img" aria-label="cooking">🍳</span>
                </div>

                <div className="max-w-md space-y-2">
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                    Projects are in the oven!
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I'm currently working on some exciting new things. Check back soon to see what's cooking!
                  </p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>
        ) : (
          <div className="divide-y divide-border/60">
            {projects.map((project, index) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group py-6 first:pt-4 last:pb-4 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Column 1: Index and Small Thumbnail */}
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-sm font-extrabold text-muted-foreground/60 w-6 shrink-0 font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    
                    {/* Compact Cover Thumbnail */}
                    <div className="w-24 h-16 rounded-xl border border-border/60 bg-muted overflow-hidden relative shrink-0">
                      {project.image ? (
                        <>
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent z-10 transition-colors duration-300" />
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-foreground/5 relative">
                          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                          <FolderSimple className="w-6 h-6 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Column 2: Title & Description */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h3 className="text-lg md:text-xl font-extrabold text-foreground group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1.5 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1 group-hover:line-clamp-2 transition-all duration-300">
                      {project.description}
                    </p>
                  </div>

                  {/* Column 3: Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 shrink-0 justify-start lg:justify-end lg:max-w-[380px]">
                    {project.tags.slice(0, 3).map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-0.5 bg-foreground/5 dark:bg-white/5 text-foreground/80 dark:text-white/80 rounded-md text-[10px] font-bold tracking-wide border border-border/30 whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 text-muted-foreground rounded-md text-[10px] font-bold whitespace-nowrap">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Column 4: Links */}
                  {(project.github || project.link) && (
                    <div className="flex lg:justify-end gap-2.5 shrink-0 lg:opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground transition-colors p-1.5 bg-foreground/5 dark:bg-white/5 rounded-lg border border-border/30 hover:border-border" 
                          aria-label="GitHub Repository"
                        >
                          <FaGithub className="w-4 h-4" />
                        </a>
                      )}
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground transition-colors p-1.5 bg-foreground/5 dark:bg-white/5 rounded-lg border border-border/30 hover:border-border" 
                          aria-label="External Link"
                        >
                          <ArrowSquareOut className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className="text-center pt-6">
            <Link href="/projects">
              <Button variant="admin-pill" size="lg" className="cursor-pointer">
                View All Projects
              </Button>
            </Link>
          </div>
        )}

      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
