import Produto, { ProdutoDados } from "../models/produto.model";

async function listar(): Promise<Produto[]> {
    const produtos = await Produto.findAll();
    return produtos;
}

async function buscarPorId(id: string): Promise<Produto | null> {
    return await Produto.findByPk(Number(id));
}

async function criar(dados: ProdutoDados): Promise<Produto> {
    if (!dados.nome || dados.preco == null) {
        throw new Error("Nome e preço são obrigatórios");
    }

    const produto = await Produto.create({
        nome: dados.nome,
        preco: dados.preco
    });

    return produto;
}

async function criarLote(dadosArray: ProdutoDados[]): Promise<Produto[]> {
    if (!Array.isArray(dadosArray) || dadosArray.length === 0) {
        throw new Error("O corpo da requisição deve ser um array de produtos");
    }

    // O Sequelize faz a validação e insere tudo de uma vez
    const produtos = await Produto.bulkCreate(dadosArray as any[]);
    return produtos;
}

async function atualizar(id: string, dados: Partial<ProdutoDados>): Promise<Produto | null> {
    const produto = await Produto.findByPk(Number(id));
    
    if (!produto) return null;

    await produto.update(dados);
    return produto;
}

async function remover(id: string): Promise<boolean> {
    const produto = await Produto.findByPk(Number(id));
    
    if (!produto) return false;

    await produto.destroy();
    return true;
}

export default {
    listar,
    buscarPorId,
    criar,
    criarLote,
    atualizar,
    remover
};
