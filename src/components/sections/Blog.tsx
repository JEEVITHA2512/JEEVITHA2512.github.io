import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowSquareOut, RssSimple } from "@phosphor-icons/react";
import BorderGlow from "@/components/ui/BorderGlow";
import { useQuery } from "@tanstack/react-query";
import { portfolioData } from "@/data/portfolioData";

type BlogItem = {
  id: number;
  title: string;
  date: string;
  link: string;
  description: string;
};

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function Blog({ id }: { id: string }) {
  const { data: blogs = [], isLoading, error } = useQuery<BlogItem[]>({
    queryKey: ["blogs"],
    queryFn: () => portfolioData.blogs,
  });

  const posts = useMemo(
    () =>
      blogs.map((item) => ({
        ...item,
        summary: stripHtml(item.description).slice(0, 240),
      })),
    [blogs]
  );

  // Hide the section completely if it's not loading and there are no posts
  if (!isLoading && posts.length === 0) return null;

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
            Blog
          </h2>
        </motion.div>

        {error ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-center text-muted-foreground">
            Unable to load the blog RSS feed right now.
          </div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <BorderGlow key={index} className="tactile-shadow tactile-hover h-full" borderRadius={32} backgroundColor="hsl(var(--card))" colors={['var(--primary)']}>
                <div
                  className="min-h-[240px] rounded-[2rem] border border-border p-6 animate-pulse z-10 h-full"
                >
                  <div className="h-10 w-10 rounded-xl bg-muted mb-4" />
                  <div className="h-5 w-3/4 bg-muted rounded mb-3" />
                  <div className="h-4 w-1/3 bg-muted rounded mb-6" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-5/6 bg-muted rounded" />
                    <div className="h-4 w-2/3 bg-muted rounded" />
                  </div>
                </div>
              </BorderGlow>
            ))
          ) : (
            posts.slice(0, 6).map((post) => (
              <BorderGlow key={post.link} className="tactile-shadow tactile-hover h-full" borderRadius={32} backgroundColor="hsl(var(--card))" colors={['var(--primary)']}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-border rounded-[2rem] p-6 md:p-8 h-full z-10 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-foreground/5 text-foreground">
                      <RssSimple className="w-6 h-6" />
                    </div>
                    <ArrowSquareOut className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {formatDate(post.date)}
                    </p>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-grow">
                    {post.summary || "Read the full article."}
                  </p>
                </a>
              </BorderGlow>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}