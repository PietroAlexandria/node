const express = require("express");

const app = express();

app.use(express.json());

const produtos = [
    { id: 1, nome: "Acer", preco: 3000},
    { id: 2, nome: "Dell", preco: 4000}
];

app.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
});

app.use('/produtos', produtoRoutes);

app.listen(3000, () => {
    console.log("API rodando na porta 3000");
});