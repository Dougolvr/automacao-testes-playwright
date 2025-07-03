import test, { expect } from "@playwright/test";

test.describe("Página Inicial", () => {
    test("Deve visitar a pagina home", async ({ page }) => {
        await page.goto("/"); // Ação
        await expect(page).toHaveTitle("Jornada Milhas"); // Asserção

        // const tituloPassagem = page.getByRole('heading', { name: 'Passagens' });
        // await expect(tituloPassagem).toBeVisible();

        const tituloPassagem = page.getByTestId('titulo-passagens');
        await expect(tituloPassagem).toBeVisible();
    });
});