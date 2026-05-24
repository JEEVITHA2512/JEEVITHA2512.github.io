import { Navbar } from "@/components/Navbar";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Publications } from "@/components/sections/Publications";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-grid-pattern relative overflow-x-hidden selection:bg-primary/30 selection:text-foreground">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <About id="about" />
        <Experience id="experience" />
        <Education id="education" />
        <Projects id="projects" />
        <Publications id="publications" />
        <Contact id="contact" />
      </main>

      <footer className="py-8 text-center border-t border-border bg-background mt-20">
        <p className="text-muted-foreground text-sm font-medium">
          © {new Date().getFullYear()} Jeevitha Murugan. Designed & Built with React.
        </p>
      </footer>
    </div>
  );
}
