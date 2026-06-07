import { useState, useEffect, useMemo } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Hamburger, X } from "@phosphor-icons/react";

interface NavbarProps {
  hasBlogs?: boolean;
  hasPublications?: boolean;
  hasPatents?: boolean;
}

export function Navbar({
  hasBlogs = false,
  hasPublications = false,
  hasPatents = false,
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = useMemo(() => {
    const links = [
      { name: "About", href: "#about" },
      { name: "Experience", href: "#experience" },
      { name: "Education", href: "#education" },
      { name: "Certifications", href: "#certifications" },
      { name: "Projects", href: "#projects" },
    ];
    if (hasBlogs) links.push({ name: "Blog", href: "#blog" });
    if (hasPublications) links.push({ name: "Publications", href: "#publications" });
    if (hasPatents) links.push({ name: "Patents", href: "#patents" });
    links.push({ name: "Contact", href: "#contact" });
    return links;
  }, [hasBlogs, hasPublications, hasPatents]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple scroll spy
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "about";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, {
          offset: -80,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({
          top: (target as HTMLElement).offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header
      className="fixed z-50 transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2 top-4 w-[calc(100%-2rem)] lg:w-[calc(100%-4rem)] max-w-7xl bg-background/80 backdrop-blur-md border border-border shadow-md py-2.5 px-6 rounded-full"
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="font-bold text-lg block">Jeevitha Murugan</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative",
                  activeSection === link.href.substring(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-primary rounded-full" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Hamburger />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute left-0 right-0 bg-background border border-border p-4 rounded-3xl shadow-lg flex flex-col gap-2 top-[calc(100%+0.5rem)] transition-all duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={cn(
                "px-4 py-3 text-base font-medium rounded-xl transition-all duration-200",
                activeSection === link.href.substring(1)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
