import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { portfolioData } from "@/data/portfolioData";
import { Briefcase, UsersThree } from "@phosphor-icons/react";

type ProfileData = {
  tagline: string | null;
  about: string;
  yearsExperience: string | null;
  experienceTitle: string | null;
  experienceSub: string | null;
  studentsMentored: string | null;
  mentorshipTitle: string | null;
  mentorshipSub: string | null;
};

export function About({ id }: { id: string }) {
  const { data: profile, isLoading } = useQuery<ProfileData>({
    queryKey: ["profile"],
    queryFn: () => portfolioData.profile,
  });

  if (isLoading) {
    return <section id={id} className="py-12 text-center text-muted-foreground font-semibold">Loading about...</section>;
  }

  if (!profile) return null;

  const showCard1 = !!profile.yearsExperience;
  const showCard2 = !!profile.studentsMentored;
  const showStats = showCard1 || showCard2;

  // Helper to split numerical values from textual labels for editorial styling
  const formatStatValue = (val: string | null) => {
    if (!val) return { number: "", label: "" };
    const parts = val.trim().split(/\s+/);
    if (parts.length > 1) {
      return { number: parts[0], label: parts.slice(1).join(" ") };
    }
    return { number: val, label: "" };
  };

  const stat1 = formatStatValue(profile.yearsExperience);
  const stat2 = formatStatValue(profile.studentsMentored);

  return (
    <section id={id} className="pt-10 pb-4">
      <div className="w-full space-y-8">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-b border-border pb-4"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-foreground">
            About Me
          </h2>
        </motion.div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Bio text (left 2/3 width or full-width if no stats are visible) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${showStats ? "lg:col-span-2" : "col-span-full"} space-y-6`}
          >
            {profile.tagline && (
              <p className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight tracking-tight">
                {profile.tagline}
              </p>
            )}
            <p className="text-base md:text-[17px] text-muted-foreground leading-relaxed font-medium whitespace-pre-line">
              {profile.about}
            </p>
          </motion.div>

          {/* Stats metrics column (right 1/3 width) - Redesigned Cards */}
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 flex flex-col gap-5 lg:pl-8 border-t lg:border-t-0 lg:border-l border-border/60 pt-8 lg:pt-0 w-full"
            >
              {showCard1 && (
                <div className="group relative p-5 rounded-[2rem] bg-card/60 dark:bg-card/30 border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {/* Abstract background blur decoration */}
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-300" />
                  
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                      {profile.experienceTitle || "Experience"}
                    </span>
                    <div className="p-2 bg-primary/5 group-hover:bg-primary/10 rounded-xl text-primary transition-colors duration-300">
                      <Briefcase className="w-5 h-5" weight="duotone" />
                    </div>
                  </div>
                  
                  <div className="space-y-1 relative z-10">
                    <h3 className="text-4xl font-extrabold text-primary tracking-tight leading-none">
                      {stat1.number}
                    </h3>
                    {stat1.label && (
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none pt-1">
                        {stat1.label}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground font-semibold leading-normal pt-1">
                      {profile.experienceSub || "Full-time work"}
                    </p>
                  </div>
                </div>
              )}

              {showCard2 && (
                <div className="group relative p-5 rounded-[2rem] bg-card/60 dark:bg-card/30 border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {/* Abstract background blur decoration */}
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-300" />
                  
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                      {profile.mentorshipTitle || "Mentorship"}
                    </span>
                    <div className="p-2 bg-primary/5 group-hover:bg-primary/10 rounded-xl text-primary transition-colors duration-300">
                      <UsersThree className="w-5 h-5" weight="duotone" />
                    </div>
                  </div>
                  
                  <div className="space-y-1 relative z-10">
                    <h3 className="text-4xl font-extrabold text-primary tracking-tight leading-none">
                      {stat2.number}
                    </h3>
                    {stat2.label && (
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none pt-1">
                        {stat2.label}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground font-semibold leading-normal pt-1">
                      {profile.mentorshipSub || "Students guided"}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
