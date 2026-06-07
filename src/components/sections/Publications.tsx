import { motion } from "framer-motion";
import { BookOpen, ArrowSquareOut } from "@phosphor-icons/react";
import BorderGlow from "@/components/ui/BorderGlow";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolioData";

type PublicationData = {
  id: number;
  title: string;
  description: string;
  publisher: string | null;
  link: string | null;
};

export function Publications({ id }: { id: string }) {
  const { data: publications = [], isLoading } = useQuery<PublicationData[]>({
    queryKey: ["publications"],
    queryFn: () => portfolioData.publications
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => portfolioData.profile
  });

  if (isLoading || publications.length === 0) return null;

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
            Publications
          </h2>
        </motion.div>

        {/* Publications List */}
        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <BorderGlow className="h-full tactile-shadow tactile-hover" borderRadius={32} backgroundColor="hsl(var(--card))" colors={['var(--primary)']}>
                <div className="p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row gap-6 items-start group z-10 h-full w-full">
                  <div className="p-4 bg-foreground/5 text-foreground rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8" />
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {pub.title}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-bold whitespace-nowrap shrink-0">
                        {pub.publisher || "Research Paper"}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                      {pub.description}
                    </p>
                    {pub.link && (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground font-semibold hover:underline text-sm">
                        Read More <ArrowSquareOut className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>

        {profile?.googleScholarUrl && (
          <div className="text-center pt-4">
            <a href={profile.googleScholarUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="admin-pill" size="lg">
                View All Publications on Google Scholar
              </Button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
