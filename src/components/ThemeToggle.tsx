import { Moon, Sun } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";
import React from "react";

type ThemeViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => ThemeViewTransition;
};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const isTransitioningRef = React.useRef(false);
  const fallbackTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    const nextTheme = isDark ? "light" : "dark";
    const doc = document as DocumentWithViewTransition;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fallback if View Transitions API is not supported or reduced motion is preferred
    if (
      !doc.startViewTransition ||
      prefersReducedMotion
    ) {
      document.documentElement.classList.add("theme-transition");
      setTheme(nextTheme);

      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }

      fallbackTimerRef.current = window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
        isTransitioningRef.current = false;
      }, 240);

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

    const transition = doc.startViewTransition(() => {
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
          duration: 380,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    }).catch(() => {
      setTheme(nextTheme);
    }).finally(() => {
      transition.finished.finally(() => {
        isTransitioningRef.current = false;
      });
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
