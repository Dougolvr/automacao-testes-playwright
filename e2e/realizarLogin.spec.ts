import test from "@playwright/test";
import LoginPage from "./page-objects/LoginPage";

test.describe("Página Login", () => {
    test("Deve realizar o login com credenciais válidas", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitarLogin();
        await loginPage.preencherLogin('douglas@tester.com', '12345');
    });
    
    test("Não deve conseguir realizar login com credenciais inválidas", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitarLogin();
        await loginPage.preencherLogin('douglas@tester.com', 'senhaInvalida');
        await loginPage.validacaoLoginInvalido('Você não está autorizado a acessar este recurso');
    });
});