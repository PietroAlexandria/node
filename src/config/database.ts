import { Sequelize } from "sequelize";

// Usando SQLite que salva os dados num arquivo local chamado "database.sqlite"
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false, // desativa os logs do SQL no console para ficar mais limpo
});

export default sequelize;
