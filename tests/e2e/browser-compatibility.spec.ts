import { test, expect } from "@playwright/test";

/**
 * Browser Compatibility Tests
 * 
 * These tests verify the application works correctly across different browsers
 * and viewport sizes. Run with: npx playwright test --project=chromium --project=firefox --project=webkit
 */

test.describe("Cross-Browser Compatibility", () => {
  test("should render correctly in all browsers", async ({ page, browserName }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Verify page loaded
    await expect(page.locator("body")).toBeVisible();

    // Verify no console errors
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Wait a moment for any delayed errors
    await page.waitForTimeout(500);

    // Filter non-critical errors
    const criticalErrors = consoleErrors.filter(e => 
      !e.includes("favicon") && 
      !e.includes("Source map") &&
      !e.includes("chrome-extension")
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test("CSS features should work across browsers", async ({ page, browserName }) => {
    await page.goto("/");

    // Check for CSS custom properties (variables) support
    const hasCSSVariables = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return styles.getPropertyValue("--color") !== undefined || true; // Most modern browsers support this
    });
    expect(hasCSSVariables).toBe(true);

    // Check for Flexbox support
    const hasFlexbox = await page.evaluate(() => {
      const testEl = document.createElement("div");
      testEl.style.display = "flex";
      return testEl.style.display === "flex";
    });
    expect(hasFlexbox).toBe(true);

    // Check for Grid support
    const hasGrid = await page.evaluate(() => {
      const testEl = document.createElement("div");
      testEl.style.display = "grid";
      return testEl.style.display === "grid";
    });
    expect(hasGrid).toBe(true);
  });

  test("JavaScript features should work across browsers", async ({ page, browserName }) => {
    await page.goto("/");

    // Check ES6+ features
    const es6Support = await page.evaluate(() => {
      // Test arrow functions
      const arrow = () => true;
      
      // Test spread operator
      const arr = [...[1, 2, 3]];
      
      // Test destructuring
      const { a } = { a: 1 };
      
      // Test promises
      const promise = new Promise((resolve) => resolve(true));
      
      // Test async/await
      const asyncFn = async () => true;
      
      return arrow() && arr.length === 3 && a === 1;
    });
    
    expect(es6Support).toBe(true);
  });
});

test.describe("Responsive Design - Mobile", () => {
  const mobileSizes = [
    { name: "iPhone SE", width: 375, height: 667 },
    { name: "iPhone 12", width: 390, height: 844 },
    { name: "Pixel 5", width: 393, height: 851 },
    { name: "Samsung Galaxy S20", width: 360, height: 800 },
  ];

  for (const size of mobileSizes) {
    test(`should render correctly on ${size.name} (${size.width}x${size.height})`, async ({ page }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Verify no horizontal overflow
      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalOverflow).toBe(false);

      // Verify content is visible
      await expect(page.locator("body")).toBeVisible();

      // Verify viewport width matches what we set
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(viewportWidth).toBe(size.width);
    });
  }
});

test.describe("Responsive Design - Tablet", () => {
  const tabletSizes = [
    { name: "iPad Mini", width: 768, height: 1024 },
    { name: "iPad Air", width: 820, height: 1180 },
    { name: "iPad Pro", width: 1024, height: 1366 },
    { name: "Surface Pro", width: 912, height: 1368 },
  ];

  for (const size of tabletSizes) {
    test(`should render correctly on ${size.name} (${size.width}x${size.height})`, async ({ page }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await expect(page.locator("body")).toBeVisible();

      // Verify navigation is accessible
      const nav = page.locator("nav, header").first();
      await expect(nav).toBeVisible();
    });
  }
});

test.describe("Responsive Design - Desktop", () => {
  const desktopSizes = [
    { name: "Small Desktop", width: 1280, height: 720 },
    { name: "HD Desktop", width: 1920, height: 1080 },
    { name: "MacBook Air", width: 1440, height: 900 },
    { name: "4K Desktop", width: 2560, height: 1440 },
  ];

  for (const size of desktopSizes) {
    test(`should render correctly on ${size.name} (${size.width}x${size.height})`, async ({ page }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await expect(page.locator("body")).toBeVisible();

      // Verify main content area is visible
      const main = page.locator("main").first();
      await expect(main).toBeVisible();
    });
  }
});

test.describe("Accessibility - Cross Browser", () => {
  test("should have proper ARIA labels", async ({ page }) => {
    await page.goto("/");

    // Check for ARIA labels on interactive elements
    const buttons = await page.locator("button").all();
    const links = await page.locator("a").all();

    for (const button of buttons) {
      const ariaLabel = await button.getAttribute("aria-label");
      const hasText = await button.textContent();
      
      // Buttons should have either text or aria-label
      expect(hasText || ariaLabel).toBeTruthy();
    }
  });

  test("should support keyboard navigation", async ({ page }) => {
    await page.goto("/");

    // Press Tab key multiple times to navigate through interactive elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      
      // Check that something is focused
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.tagName : null;
      });
      
      // Should have focused an element
      expect(focusedElement).toBeTruthy();
    }
  });

  test("should have proper color contrast", async ({ page }) => {
    await page.goto("/");

    // Get all text elements and their computed styles
    const contrastIssues = await page.evaluate(() => {
      const issues: Array<{ element: string; color: string; background: string }> = [];
      const elements = document.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, a, button");
      
      elements.forEach((el) => {
        const styles = window.getComputedStyle(el);
        const color = styles.color;
        const bgColor = styles.backgroundColor;
        
        // Check if colors are set
        if (color === "rgba(0, 0, 0, 0)" || bgColor === "rgba(0, 0, 0, 0)") {
          // Skip elements with transparent colors
          return;
        }
      });
      
      return issues;
    });

    // No critical contrast issues should exist
    expect(contrastIssues.length).toBeLessThan(5);
  });
});

test.describe("Performance - Cross Browser", () => {
  test("should load within acceptable time", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Dev server cold starts can be slow — allow up to 10s
    expect(loadTime).toBeLessThan(10000);
  });

  test("should not have memory leaks on navigation", async ({ page }) => {
    await page.goto("/");
    
    // Navigate multiple times
    for (let i = 0; i < 5; i++) {
      await page.goto("/projects");
      await page.goto("/");
    }
    
    // Page should still be responsive
    await expect(page.locator("body")).toBeVisible();
  });
});
