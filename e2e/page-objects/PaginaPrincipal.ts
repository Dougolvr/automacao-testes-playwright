import { expect, Locator, Page } from "@playwright/test";

export default class PaginaPrincial {
    private readonly page: Page;
    private readonly campoDropDownOrigem: Locator;
    private readonly campoDropDownDestino: Locator;
    private readonly botaoSomenteIda: Locator;
    private readonly botaoPassageiros: Locator;
    private readonly botaoAdicaoAdultos: Locator;
    private readonly campoEstadoDestino: Locator;
    private readonly campoDataIda: Locator;
    private readonly botaoBuscar: Locator;
    private readonly botaoAdicaoCriancas: any;
    private readonly botaoAdicaoBebes: any;
    private readonly botaoFecharPassageiros: any;
    private readonly campoEstadoOrigem: Locator;
    private readonly textoIdaVolta: Locator;
    private readonly botaoComprar: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.campoDropDownOrigem = page
            .getByTestId('campo-dropdown-origem')
            .getByLabel('Origem');
        this.campoDropDownDestino = page
            .getByTestId('campo-dropdown-destino')
            .getByLabel('Destino');
        this.botaoSomenteIda = page.getByTestId('botao-somente-ida');
        this.botaoPassageiros = page.getByTestId('abrir-modal-passageiros');
        this.botaoAdicaoAdultos = page
            .getByTestId('seletor-passageiro-adultos')
            .getByRole('button', { name: 'adição' });
        this.botaoAdicaoCriancas = page
            .getByTestId('seletor-passageiro-criancas')
            .getByRole('button', { name: 'adição' });
        this.botaoAdicaoBebes = page
            .getByTestId('seletor-passageiro-bebes')
            .getByRole('button', { name: 'adição' });
        this.botaoFecharPassageiros = page.getByTestId('fechar-modal-passageiros');
        this.campoEstadoOrigem = page.getByTestId('container-origem');
        this.campoEstadoDestino = page.getByTestId('container-destino');
        this.campoDataIda = page.getByTestId('campo-data-ida');
        this.botaoBuscar = page.getByTestId('botao-buscar-passagens');
        this.textoIdaVolta = page.getByTestId('texto-ida-volta');
        this.botaoComprar = page.getByTestId('botao-comprar');
    }

    async visitarPagina() {
        await this.page.goto('/');
    }

    async definirSomenteIda() {
        await this.botaoSomenteIda.click();
    }

    async abrirModalPassageiros() {
        await this.botaoPassageiros.click()
    }

    async definirPassageirosAdultos(quantidade: number) {
        for (let i = 1; i < quantidade; i++){
            await this.botaoAdicaoAdultos.click();
        }
    }

    async definirPassageirosCriancas(quantidade: number) {
        for (let i = 0; i < quantidade; i++){
            await this.botaoAdicaoCriancas.click();
        }
    }

    async definirPassageirosBebes(quantidade: number) {
        for (let i = 0; i < quantidade; i++){
            await this.botaoAdicaoBebes.click();
        }
    }

    async fecharModalPassageiros(){
        await this.botaoFecharPassageiros.click();
    }

    async definirOrigemEDestino(origem: string, destino: string) {
        await this.campoDropDownOrigem.fill(origem);
        await this.campoDropDownOrigem.press('Enter');
        await this.campoDropDownDestino.fill(destino);
        await this.campoDropDownDestino.press('Enter');
    }

    async definirData(data: Date) {
        const dataFormatada = data.toLocaleString('en-US', { dateStyle: 'short' }); // metodo para formatar a data em 01/01/2025
        await this.campoDataIda.fill(dataFormatada);
    }

    async buscarPassagens() {
        await this.botaoBuscar.click();
    }

    async estaMostrandoPassagem(
        tipoTrajeto: 'Somente ida'| 'Ida e volta', // Parametro 1
        origem: string, // Parametro 2
        destino: string, // Parametro 3
    ) {
        await expect(this.textoIdaVolta).toHaveText(tipoTrajeto); // toHaveText é usando para localizar o texto exato do parametro
        await expect(this.campoEstadoOrigem).toContainText(origem);
        await expect(this.campoEstadoDestino).toContainText(destino); // toContainText é usando para localizar apenas um texto do container sem precisar ser exato
        await expect(this.botaoComprar).toBeVisible();
    }

    async confirmarCompra() {
        await this.botaoComprar.click();
    }
}