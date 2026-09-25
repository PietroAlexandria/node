import express from "express";
import produtoRoutes from "./routes/produto.routes";
import sequelize from "./config/database";

const app = express();

app.use(express.json());
app.use("/produtos", produtoRoutes);

export default app;
