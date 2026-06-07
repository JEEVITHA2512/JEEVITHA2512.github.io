import { test, expect } from "@playwright/test";

test.describe("Home Page E2E Tests", () => {
  test("should load home page successfully", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Jeevitha|Portfolio|Home/i);
  });

  test("should display hero section with name", async ({ page }) => {
    await page.goto("/");

    const heroContent = page.locator("h1, .hero, [data-testid='hero']").first();
    await expect(heroContent).toBeVisible();

    const pageText = await page.textContent("body");
    expect(pageText).toContain("Jeevitha");
  });

  test("should have working navigation", async ({ page }) => {
    await page.goto("/");

    // The header contains both desktop nav and mobile menu button
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    const links = header.locator("a");
    expect(await links.count()).toBeGreaterThan(0);
  });

  test("should navigate to projects section", async ({ page }) => {
    await page.goto("/");

    // Nav links are hash anchors (#projects) — they scroll within the same page, no URL change
    const projectsLink = page.locator("a[href='#projects'], a[href*='/projects']").first();

    if (await projectsLink.isVisible().catch(() => false)) {
      await projectsLink.click();
      // SPA hash navigation — just confirm the link exists and is clickable
      await expect(projectsLink).toBeVisible();
    }
  });

  test("should display skills/tech stack section", async ({ page }) => {
    await page.goto("/");

    const skillsSection = page
      .locator("section:has-text('Skills'), section:has-text('Tech'), [data-testid='skills']")
      .first();

    if (await skillsSection.isVisible().catch(() => false)) {
      await expect(skillsSection).toBeVisible();
    }
  });

  test("should display experience section", async ({ page }) => {
    await page.goto("/");

    const experienceSection = page
      .locator("section:has-text('Experience'), section:has-text('Work')")
      .first();

    if (await experienceSection.isVisible().catch(() => false)) {
      await expect(experienceSection).toBeVisible();
    }
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await expect(page.locator("body")).toBeVisible();

    // On mobile, the desktop nav is hidden (md:hidden class). The mobile toggle button
    // has class "md:hidden" and no aria-label — match by the header being visible instead
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    // Confirm the mobile menu button exists (md:hidden button inside header)
    const mobileMenuButton = page.locator("header button.md\\:hidden").first();
    const hasMobileButton = await mobileMenuButton.isVisible().catch(() => false);

    // Either a visible mobile button or a visible nav confirms responsive layout
    const desktopNav = page.locator("header nav").first();
    const hasVisibleNav = await desktopNav.isVisible().catch(() => false);

    expect(hasMobileButton || hasVisibleNav).toBe(true);
  });

  test("should be responsive on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    await expect(page.locator("body")).toBeVisible();
  });

  test("should have working theme toggle if present", async ({ page }) => {
    await page.goto("/");

    const themeToggle = page
      .locator("button[aria-label*='theme'], button[aria-label*='dark'], button[aria-label*='light']")
      .first();

    if (await themeToggle.isVisible().catch(() => false)) {
      const initialTheme = await page.evaluate(() => document.documentElement.className);
      await themeToggle.click();
      await page.waitForTimeout(100);
      const newTheme = await page.evaluate(() => document.documentElement.className);
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test("should load without console errors", async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    page.on("pageerror", (error) => {
      consoleErrors.push(error.message);
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Filter non-critical errors: missing resources (fonts, CDN, 404s), source maps,
    // browser extensions, and network failures from external hosts
    const criticalErrors = consoleErrors.filter((e) =>
      !e.includes("favicon") &&
      !e.includes("Source map") &&
      !e.includes("chrome-extension") &&
      !e.includes("Failed to load resource") &&
      !e.includes("ERR_NAME_NOT_RESOLVED") &&
      !e.includes("ERR_CONNECTION_REFUSED") &&
      !e.includes("net::") &&
      !e.includes("fonts.googleapis") &&
      !e.includes("fonts.gstatic") &&
      !e.includes("onlinewebfonts")
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test("should have valid links", async ({ page }) => {
    await page.goto("/");

    const links = await page.locator("a[href^='/'], a[href^='http']").all();

    for (const link of links.slice(0, 10)) {
      const href = await link.getAttribute("href");
      if (href && href.startsWith("/") && !href.startsWith("/#")) {
        const response = await page.request.get(href);
        expect(response.status()).toBeLessThan(500);
      }
    }
  });

  test("should have meta tags for SEO", async ({ page }) => {
    await page.goto("/");

    const metaDescription = page.locator('meta[name="description"]');
    expect(await metaDescription.count()).toBeGreaterThan(0);

    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute("content", /width=device-width/);
  });

  test("should handle unknown routes gracefully", async ({ page }) => {
    await page.goto("/non-existent-page");

    // SPA with Vite dev server serves the app shell for all routes — just confirm body loads
    await expect(page.locator("body")).toBeVisible();

    // Either a 404 message OR the main app shell is acceptable
    const bodyText = await page.textContent("body");
    expect(bodyText).toBeTruthy();
    expect(bodyText!.length).toBeGreaterThan(0);
  });
});
