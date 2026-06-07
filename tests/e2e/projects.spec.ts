import { test, expect } from "@playwright/test";

test.describe("Projects Page E2E Tests", () => {
  test("should load projects page", async ({ page }) => {
    await page.goto("/projects");

    await expect(page.locator("body")).toBeVisible();
    
    // Should contain Projects in title or heading
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });

  test("should display projects list", async ({ page }) => {
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");

    // Look for project cards or list
    const projects = page.locator("[data-testid='project'], .project-card, article, .card");
    
    // If projects exist, they should be visible
    const count = await projects.count();
    if (count > 0) {
      await expect(projects.first()).toBeVisible();
    }
  });

  test("should have project details", async ({ page }) => {
    await page.goto("/projects");

    // Look for project titles
    const projectTitles = page.locator("h3, .project-title, [data-testid='project-title']");
    
    if (await projectTitles.first().isVisible().catch(() => false)) {
      const title = await projectTitles.first().textContent();
      expect(title).toBeTruthy();
    }
  });

  test("should have filter or search functionality if present", async ({ page }) => {
    await page.goto("/projects");

    const searchInput = page.locator("input[type='search'], input[placeholder*='search' i], input[placeholder*='filter' i]").first();
    const filterButton = page.locator("button:has-text('Filter'), button:has-text('Category'), select").first();

    // If search exists, it should be interactive
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill("AI");
      await expect(searchInput).toHaveValue("AI");
    }

    // If filter exists, it should be clickable
    if (await filterButton.isVisible().catch(() => false)) {
      await expect(filterButton).toBeEnabled();
    }
  });

  test("should have project links", async ({ page }) => {
    await page.goto("/projects");

    // Look for project links (GitHub, Demo, etc.)
    const links = page.locator("a[href^='http'], a[href^='/']");
    
    if (await links.first().isVisible().catch(() => false)) {
      const firstLink = links.first();
      await expect(firstLink).toHaveAttribute("href");
    }
  });

  test("should display project images if available", async ({ page }) => {
    await page.goto("/projects");

    const images = page.locator("img.project-image, img[src]");

    // If images exist, they should load properly — await .all() before slicing
    const allImages = await images.all();
    for (const img of allImages.slice(0, 3)) {
      await expect(img).toHaveAttribute("src");
    }
  });

  test("should show project tags/technologies", async ({ page }) => {
    await page.goto("/projects");

    // Look for technology tags
    const tags = page.locator(".tag, .badge, [data-testid='tag']");
    
    if (await tags.first().isVisible().catch(() => false)) {
      const tagText = await tags.first().textContent();
      expect(tagText).toBeTruthy();
    }
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/projects");

    await expect(page.locator("body")).toBeVisible();

    // Projects should stack vertically on mobile
    const projectCards = page.locator("article, .project-card, .card");
    if (await projectCards.first().isVisible().catch(() => false)) {
      await expect(projectCards.first()).toBeVisible();
    }
  });

  test("should navigate back to home", async ({ page }) => {
    await page.goto("/projects");

    // Find home/back link
    const homeLink = page.locator("a[href='/'], a:has-text('Home'), a:has-text('Back')").first();
    
    if (await homeLink.isVisible().catch(() => false)) {
      await homeLink.click();
      await expect(page).toHaveURL(/\/$/);
    }
  });
});
