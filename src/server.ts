import app from "./app";
import sequelize from "./config/database";

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000 e banco de dados sincronizado");
    });
});
