import { Moon, Sun } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";
import React from "react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";

    // Fallback if View Transitions API is not supported or reduced motion is preferred
    if (
      !(document as any).startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.documentElement.classList.add("theme-transition");
      setTheme(nextTheme);
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 300);
      return;
    }

    // Capture circular sweep origin coordinates from click event
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate maximum radius to fully cover screen from origin
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      // Circular clip-path sweep reveals the new screen capture smoothly
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 450,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-xl bg-card border border-border tactile-shadow tactile-hover w-10 h-10 flex items-center justify-center overflow-hidden cursor-pointer",
        className
      )}
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun 
          className={cn(
            "w-5 h-5 text-primary absolute transition-all duration-500 ease-out transform",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          )} 
        />
        <Moon 
          className={cn(
            "w-5 h-5 text-foreground absolute transition-all duration-500 ease-out transform",
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )} 
        />
      </div>
    </button>
  );
}
