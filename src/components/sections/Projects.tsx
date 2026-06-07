import { motion } from "framer-motion";
import { FolderSimple, ArrowSquareOut } from "@phosphor-icons/react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { portfolioData } from "@/data/portfolioData";
import BorderGlow from "@/components/ui/BorderGlow";

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
                className="group py-6 first:pt-4 last:pb-4 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Column 1: Index and Small Thumbnail (col-span-3) */}
                  <div className="lg:col-span-3 flex items-center gap-4 shrink-0">
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

                  {/* Column 2: Title & Description (col-span-6) */}
                  <div className="lg:col-span-6 space-y-1.5 min-w-0">
                    <h3 className="text-lg md:text-xl font-extrabold text-foreground group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1.5 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1 group-hover:line-clamp-2 transition-all duration-300">
                      {project.description}
                    </p>
                  </div>

                  {/* Column 3: Tech Tags (col-span-2) */}
                  <div className="lg:col-span-2 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-0.5 bg-foreground/5 dark:bg-white/5 text-foreground/80 dark:text-white/80 rounded-md text-[10px] font-bold tracking-wide border border-border/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 text-muted-foreground rounded-md text-[10px] font-bold">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Column 4: Links (col-span-1) */}
                  <div className="lg:col-span-1 flex justify-end gap-2.5 lg:opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
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
                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5 bg-foreground/5 dark:bg-white/5 rounded-lg border border-border/30 hover:border-border" 
                        aria-label="External Link"
                      >
                        <ArrowSquareOut className="w-4 h-4" />
                      </a>
                    )}
                  </div>

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
    </section>
  );
}
