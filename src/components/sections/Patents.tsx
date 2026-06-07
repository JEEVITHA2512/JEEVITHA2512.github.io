import { motion } from "framer-motion";
import { Lightbulb, ArrowSquareOut } from "@phosphor-icons/react";
import BorderGlow from "@/components/ui/BorderGlow";
import { useQuery } from "@tanstack/react-query";
import { portfolioData } from "@/data/portfolioData";

type PatentData = {
  id: number;
  title: string;
  description: string;
  link: string | null;
};

export function Patents({ id }: { id: string }) {
  const { data: patents = [], isLoading } = useQuery<PatentData[]>({
    queryKey: ["patents"],
    queryFn: () => portfolioData.patents
  });

  if (isLoading || patents.length === 0) return null;

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
            Patents
          </h2>
        </motion.div>

        {/* Patents List */}
        <div className="space-y-6">
          {patents.map((patent, index) => (
            <motion.div
              key={patent.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <BorderGlow className="h-full tactile-shadow tactile-hover" borderRadius={32} backgroundColor="hsl(var(--card))" colors={['var(--primary)']}>
                <div className="p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row gap-6 items-start group z-10 h-full w-full">
                  <div className="p-4 bg-foreground/5 text-foreground rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-8 h-8" />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {patent.title}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-foreground/5 border border-foreground/10 text-foreground/80 rounded-full text-xs font-bold whitespace-nowrap shrink-0">
                        Patent
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {patent.description}
                    </p>
                    {patent.link && (
                      <a href={patent.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground font-semibold hover:underline text-sm mt-4">
                        View Patent <ArrowSquareOut className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
