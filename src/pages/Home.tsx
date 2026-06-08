import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Projects } from "@/components/sections/Projects";
import { Blog } from "@/components/sections/Blog";
import { Publications } from "@/components/sections/Publications";
import { Patents } from "@/components/sections/Patents";
import { Contact } from "@/components/sections/Contact";
import { StackPanel } from "@/components/sections/StackPanel";
import { useQuery } from "@tanstack/react-query";
import { portfolioData } from "@/data/portfolioData";
import BorderGlow from "@/components/ui/BorderGlow";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { EnvelopeSimple, ArrowRight } from "@phosphor-icons/react";
import { Component as LumaSpin } from "@/components/ui/luma-spin";

export default function Home() {
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => portfolioData.profile
  });

  const { data: blogs = [], isLoading: isBlogsLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => portfolioData.blogs
  });

  const { data: publications = [], isLoading: isPubsLoading } = useQuery({
    queryKey: ["publications"],
    queryFn: () => portfolioData.publications
  });

  const { data: patents = [], isLoading: isPatentsLoading } = useQuery({
    queryKey: ["patents"],
    queryFn: () => portfolioData.patents
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  const isLoading = isProfileLoading || isBlogsLoading || isPubsLoading || isPatentsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <LumaSpin />
      </div>
    );
  }

  if (!profile) return null;

  const hasBlogs = blogs.length > 0;
  const hasPublications = publications.length > 0;
  const hasPatents = patents.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground bg-grid-pattern relative overflow-x-clip selection:bg-primary/30 selection:text-foreground">
      <Navbar 
        hasBlogs={hasBlogs} 
        hasPublications={hasPublications} 
        hasPatents={hasPatents} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:landscape:grid-cols-12 xl:grid-cols-12 gap-8 items-start relative">
          
          {/* Left Column: Static Profile Card */}
          <aside className="lg:landscape:col-span-4 xl:col-span-3 relative h-full">
            <div className="lg:landscape:fixed xl:fixed lg:landscape:top-[90px] xl:top-[90px] lg:landscape:w-[inherit] xl:w-[inherit] lg:landscape:max-h-[calc(100vh-110px)] xl:max-h-[calc(100vh-110px)] lg:landscape:overflow-y-auto xl:overflow-y-auto space-y-3 xl:space-y-4 pb-4 w-full max-w-sm mx-auto lg:landscape:mx-0 xl:mx-0 z-20">
              
              {/* Avatar Photo */}
              <BorderGlow className="shadow-md" borderRadius={32} backgroundColor="hsl(var(--card))" colors={['var(--primary)']}>
                <div className="p-3 rounded-[2rem] bg-card overflow-hidden">
                  <div className="aspect-square w-full rounded-2xl overflow-hidden bg-muted relative">
                    {profile.avatarUrl ? (
                      <img
                        src={profile.avatarUrl.startsWith("http") ? profile.avatarUrl : `${import.meta.env.BASE_URL.replace(/\/$/, "")}${profile.avatarUrl}`}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No Photo
                      </div>
                    )}
                  </div>
                </div>
              </BorderGlow>

              {/* Profile Info Details */}
              <BorderGlow className="shadow-md" borderRadius={32} backgroundColor="hsl(var(--card))" colors={['var(--primary)']}>
                <div className="p-4 rounded-[2rem] bg-card space-y-3 xl:space-y-3.5">
                  <div>
                    <h1 className="text-xl xl:text-[22px] font-extrabold text-foreground">{profile.name}</h1>
                    <p className="text-xs xl:text-sm font-semibold text-muted-foreground mt-1">{profile.title}</p>
                  </div>

                  {/* Details list */}
                  <div className="space-y-1.5 xl:space-y-2 border-t border-b border-border py-2 xl:py-2.5 text-xs font-semibold">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-muted-foreground shrink-0">Location</span>
                      <span className="text-foreground truncate max-w-[190px]">{profile.location || "—"}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-muted-foreground shrink-0">Email</span>
                      <a href={`mailto:${profile.email}`} className="text-foreground hover:text-primary transition-colors truncate max-w-[190px]" title={profile.email}>
                        {profile.email}
                      </a>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-muted-foreground shrink-0">Role</span>
                      <span className="text-foreground truncate max-w-[190px]" title={profile.role || ""}>{profile.role || "—"}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-muted-foreground shrink-0">Community</span>
                      <span className="text-foreground truncate max-w-[190px]" title={profile.community || ""}>{profile.community || "—"}</span>
                    </div>
                  </div>

                  {/* Social & CTA button */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <a 
                        href={profile.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 p-2 bg-muted hover:bg-foreground/5 border border-border rounded-xl text-center flex justify-center text-foreground hover:text-primary transition-all duration-200" 
                        title="GitHub"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                      <a 
                        href={profile.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 p-2 bg-muted hover:bg-foreground/5 border border-border rounded-xl text-center flex justify-center text-foreground hover:text-primary transition-all duration-200" 
                        title="LinkedIn"
                      >
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                      <a 
                        href={`mailto:${profile.email}`} 
                        className="flex-1 p-2 bg-muted hover:bg-foreground/5 border border-border rounded-xl text-center flex justify-center text-foreground hover:text-primary transition-all duration-200" 
                        title="Email"
                      >
                        <EnvelopeSimple className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                </div>
              </BorderGlow>

            </div>
          </aside>

          {/* Right Column: Scrollable Sections */}
          <div className="lg:landscape:col-span-8 xl:col-span-9 space-y-4 lg:landscape:space-y-6 xl:space-y-6 w-full">
            <About id="about" />
            <Experience id="experience" />
            <StackPanel skills={profile.techSkills} />
            <Education id="education" />
            <Certifications id="certifications" />
            <Projects id="projects" />
            {hasBlogs && <Blog id="blog" />}
            {hasPublications && <Publications id="publications" />}
            {hasPatents && <Patents id="patents" />}
            <Contact id="contact" />
            
            <footer className="py-8 text-center border-t border-border bg-background mt-8">
              <p className="text-muted-foreground text-sm font-medium">
                © {new Date().getFullYear()} Jeevitha Murugan. All rights reserved.
              </p>
            </footer>
          </div>

        </div>
      </main>
    </div>
  );
}
