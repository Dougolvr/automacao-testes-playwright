import test from "@playwright/test";
import PaginaPrincial from "./page-objects/PaginaPrincipal";

test.describe('Buscar Passagens', () => {
    test('Deve buscar passagens de somente ida', async ({ page }) => {
        const paginaPrincipal = new PaginaPrincial(page);

        await paginaPrincipal.visitarPagina();
        await paginaPrincipal.definirSomenteIda();
        
        await paginaPrincipal.abrirModalPassageiros();
        await paginaPrincipal.definirPassageirosAdultos(3);
        await paginaPrincipal.definirPassageirosCriancas(2);
        await paginaPrincipal.definirPassageirosBebes(1);

        await paginaPrincipal.fecharModalPassageiros();

        await paginaPrincipal.definirOrigemEDestino('minas gerais', 'rio de janeiro');
        await paginaPrincipal.definirData(new Date()); // para data do dia atual. Pode inserir outra data como Date('01/09/2025')
        await paginaPrincipal.buscarPassagens();

        await paginaPrincipal.estaMostrandoPassagem('Somente ida', 'Minas Gerais', 'Rio de Janeiro');
    }); 
});