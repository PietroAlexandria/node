import request from "supertest";
import app from "../app";
import sequelize from "../config/database";

describe("Testes do CRUD de Produtos", () => {
    // Antes de todos os testes, sincroniza o banco do zero (limpa tudo)
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    // Depois de todos os testes, fecha a conexão com o banco
    afterAll(async () => {
        await sequelize.close();
    });

    let produtoId: number;

    it("Deve criar um produto com sucesso (POST /produtos)", async () => {
        const res = await request(app)
            .post("/produtos")
            .send({
                nome: "Produto Teste",
                preco: 50.0
            });

        expect(res.status).toBe(201);
        expect(res.body.nome).toBe("Produto Teste");
        expect(res.body.preco).toBe(50.0);
        expect(res.body.id).toBeDefined();

        produtoId = res.body.id; // Guarda o ID para os próximos testes
    });

    it("Deve dar erro 400 ao criar produto sem nome (POST /produtos)", async () => {
        const res = await request(app)
            .post("/produtos")
            .send({
                preco: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.mensagem).toBe("Nome e preço são obrigatórios");
    });

    it("Deve criar vários produtos de uma vez (POST /produtos/lote)", async () => {
        const res = await request(app)
            .post("/produtos/lote")
            .send([
                { nome: "Monitor", preco: 1000 },
                { nome: "Teclado", preco: 200 }
            ]);

        expect(res.status).toBe(201);
        expect(res.body.length).toBe(2);
    });

    it("Deve dar erro 400 ao enviar payload inválido para o lote (POST /produtos/lote)", async () => {
        const res = await request(app)
            .post("/produtos/lote")
            .send({ nome: "Nao sou array", preco: 100 });

        expect(res.status).toBe(400);
        expect(res.body.mensagem).toBe("O corpo da requisição deve ser um array de produtos");
    });

    it("Deve listar todos os produtos (GET /produtos)", async () => {
        const res = await request(app).get("/produtos");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("Deve buscar um produto pelo ID (GET /produtos/:id)", async () => {
        const res = await request(app).get(`/produtos/${produtoId}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(produtoId);
        expect(res.body.nome).toBe("Produto Teste");
    });

    it("Deve retornar 404 ao buscar ID inexistente (GET /produtos/:id)", async () => {
        const res = await request(app).get("/produtos/9999");

        expect(res.status).toBe(404);
        expect(res.body.mensagem).toBe("Produto não encontrado");
    });

    it("Deve atualizar um produto com sucesso (PUT /produtos/:id)", async () => {
        const res = await request(app)
            .put(`/produtos/${produtoId}`)
            .send({
                preco: 75.0
            });

        expect(res.status).toBe(200);
        expect(res.body.preco).toBe(75.0);
    });

    it("Deve retornar 404 ao tentar atualizar ID inexistente (PUT /produtos/:id)", async () => {
        const res = await request(app)
            .put("/produtos/9999")
            .send({ preco: 50.0 });

        expect(res.status).toBe(404);
        expect(res.body.mensagem).toBe("Produto não encontrado");
    });

    it("Deve remover um produto com sucesso (DELETE /produtos/:id)", async () => {
        const res = await request(app).delete(`/produtos/${produtoId}`);

        expect(res.status).toBe(204);
    });

    it("Deve retornar 404 ao tentar remover ID inexistente (DELETE /produtos/:id)", async () => {
        const res = await request(app).delete("/produtos/9999");

        expect(res.status).toBe(404);
        expect(res.body.mensagem).toBe("Produto não encontrado");
    });
});
