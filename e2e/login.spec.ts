import { test, expect } from "@playwright/test";

test("fluxo de login e visualização de produtos", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel(/usuário/i).fill("dinamica");
  await page.getByLabel(/senha/i).fill("123");
  await page.getByRole("button", { name: /login/i }).click();

  await expect(page).toHaveURL(/produtos/);
  await expect(page.locator("article")).toHaveCount(8);
});