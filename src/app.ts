import express from "express";
import produtoRoutes from "./routes/produto.routes";
import sequelize from "./config/database";

const app = express();

app.use(express.json());
app.use("/produtos", produtoRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000 e banco de dados sincronizado");
    });
});
