import { Locator, Page, expect } from "@playwright/test";

export default class LoginPage {
    private readonly page: Page
    private readonly botaoLogin: Locator;
    private readonly inputEmail: Locator;
    private readonly inputSenha: Locator;
    private readonly botaoAcessarConta: Locator;

    constructor (page: Page) {
        this.page = page;
        this.botaoLogin = page.getByTestId('botao-login');
        this.inputEmail = page.getByTestId('input-email');
        this.inputSenha = page.getByTestId('input-senha');
        this.botaoAcessarConta = page.getByTestId('botao-acessar-conta');
    }

    async visitarLogin() {
        await this.page.goto('/');
        await this.botaoLogin.click();
        await expect(this.page).toHaveURL('/auth/login');
    }

    async preencherLogin(email: string, senha: string) {
        await this.inputEmail.fill(email);
        await this.inputSenha.fill(senha);
        await this.botaoAcessarConta.click()
    }

    async validacaoLoginComSucesso() {
        await expect(this.page).toHaveURL('/home');
    }

    async validacaoLoginInvalido(mensagem: string) {
        const mensagemErro = this.page.getByText(mensagem);
        await expect(mensagemErro).toBeVisible();
    }
}