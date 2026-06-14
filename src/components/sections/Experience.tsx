import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { portfolioData } from "@/data/portfolioData";

type ExperienceData = {
  id: number;
  role: string;
  company: string;
  companyDescription: string | null;
  date: string;
  duration: string;
  location: string;
  highlights: string[];
  skills: string[];
};

export function Experience({ id }: { id: string }) {
  const { data: experiences = [], isLoading } = useQuery<ExperienceData[]>({
    queryKey: ["experiences"],
    queryFn: () => portfolioData.experiences,
  });

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id={id} className="pt-10 pb-4">
      <div className="w-full space-y-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-b border-border pb-4"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-foreground">
            Experience
          </h2>
        </motion.div>

        {/* Experience List Container */}
        <div className="divide-y divide-border/60">
          {isLoading ? (
            <div className="py-12 text-center text-muted-foreground font-semibold">Loading experiences...</div>
          ) : (
            experiences.map((exp, index) => (
              <motion.div
                key={exp.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(exp.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setHoveredId(hoveredId === exp.id ? null : exp.id)}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-10 first:pt-4 last:pb-4 items-start cursor-pointer transition-all duration-300 hover:bg-foreground/[0.02] dark:hover:bg-white/[0.02] px-4 -mx-4 rounded-2xl group"
              >
                
                {/* Column 1: Company & Dates (col-span-3) */}
                <div className="lg:col-span-3 space-y-2">
                  <h3 className="text-2xl font-extrabold text-foreground leading-none group-hover:text-primary transition-colors">
                    {exp.company}
                  </h3>
                  <p className="text-sm font-semibold text-muted-foreground mt-1">
                    {exp.companyDescription || exp.company}
                  </p>
                  <p className="text-sm font-bold text-primary tracking-wide pt-2 uppercase">
                    {exp.date}
                  </p>
                </div>

                {/* Column 2: Metadata Details Table (col-span-3) */}
                <div className="lg:col-span-3">
                  <div className="w-full text-xs font-semibold text-muted-foreground space-y-2.5">
                    <div className="border-b border-border/40 pb-2.5 flex justify-between gap-4 items-start">
                      <span className="text-muted-foreground/60 uppercase tracking-wider shrink-0">Position</span>
                      <span className="text-foreground text-right">{exp.role}</span>
                    </div>
                    <div className="border-b border-border/40 pb-2.5 flex justify-between gap-4 items-start">
                      <span className="text-muted-foreground/60 uppercase tracking-wider shrink-0">Location</span>
                      <span className="text-foreground text-right">{exp.location}</span>
                    </div>
                    <div className="border-b border-border/40 pb-2.5 flex justify-between gap-4 items-start">
                      <span className="text-muted-foreground/60 uppercase tracking-wider shrink-0">Duration</span>
                      <span className="text-foreground text-right">{exp.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Detailed Description Paragraphs (col-span-6) */}
                <div className="lg:col-span-6 space-y-3.5 text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                  {/* Skills tags: visible by default */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pb-1">
                      {exp.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-muted text-foreground text-[10px] md:text-xs font-bold rounded-lg border border-border uppercase tracking-wider">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Highlights collapsible animation container */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredId === exp.id ? "auto" : 0,
                      opacity: hoveredId === exp.id ? 1 : 0
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden space-y-3"
                  >
                    {exp.highlights.map((point, i) => (
                      <p key={i} className="text-xs md:text-sm text-muted-foreground font-medium">
                        {point}
                      </p>
                    ))}
                  </motion.div>

                  {/* Interactivity Indicator */}
                  <div className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground/45 group-hover:text-primary transition-colors duration-300 pt-1">
                    {hoveredId === exp.id ? "Click/Leave to collapse" : "Hover / Tap to view details"}
                  </div>
                </div>

              </motion.div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
