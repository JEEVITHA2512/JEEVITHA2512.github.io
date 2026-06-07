import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility (className merger)", () => {
  it("should merge basic class names", () => {
    const result = cn("class1", "class2");
    expect(result).toBe("class1 class2");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base", isActive && "active");
    expect(result).toBe("base active");
  });

  it("should filter out falsy values", () => {
    const result = cn("base", false && "hidden", null, undefined, "visible");
    expect(result).toBe("base visible");
  });

  it("should handle empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should merge Tailwind classes correctly", () => {
    // tailwind-merge should handle conflicting classes
    const result = cn("p-4 px-2", "p-6");
    expect(result).toContain("p-6");
  });

  it("should handle array syntax", () => {
    const result = cn(["class1", "class2"]);
    expect(result).toBe("class1 class2");
  });

  it("should handle nested arrays", () => {
    const result = cn("base", ["nested1", ["nested2"]]);
    expect(result).toBe("base nested1 nested2");
  });

  it("should handle object syntax", () => {
    const result = cn({
      "bg-red": true,
      "bg-blue": false,
      "text-lg": true,
    });
    expect(result).toBe("bg-red text-lg");
  });

  it("should handle mixed syntax", () => {
    const result = cn(
      "base",
      ["array-class"],
      { "object-class": true },
      false && "hidden",
      "final"
    );
    expect(result).toBe("base array-class object-class final");
  });

  it("should deduplicate classes", () => {
    const result = cn("p-4", "p-4");
    expect(result).toBe("p-4");
  });

  it("should handle complex real-world scenario", () => {
    const isPrimary = true;
    const isDisabled = false;
    const size = "lg";

    const result = cn(
      "inline-flex items-center justify-center rounded-md",
      isPrimary ? "bg-blue-600 text-white" : "bg-gray-200",
      isDisabled && "opacity-50 cursor-not-allowed",
      size === "sm" && "h-8 px-3",
      size === "lg" && "h-12 px-6"
    );

    expect(result).toBe("inline-flex items-center justify-center rounded-md bg-blue-600 text-white h-12 px-6");
  });
});
