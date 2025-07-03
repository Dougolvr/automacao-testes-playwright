import { test } from './page-objects/LoginPage';

test.describe("Página Login", () => {
    test("Deve realizar o login com credenciais válidas", async ({ loginPage }) => {
        await loginPage.preencherLogin('douglas@tester.com', '12345');
        await loginPage.validacaoLoginComSucesso();
    });
    
    test("Não deve conseguir realizar login com credenciais inválidas", async ({ loginPage }) => {
        await loginPage.preencherLogin('douglas@tester.com', 'senhaInvalida');
        await loginPage.validacaoLoginInvalido('Você não está autorizado a acessar este recurso');
    });
});