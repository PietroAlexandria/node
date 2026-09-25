import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface ProdutoDados {
    nome: string;
    preco: number;
}

class Produto extends Model {
    public declare id: number;
    public declare nome: string;
    public declare preco: number;

    // Métodos de instância também podem ser adicionados no Sequelize
    public estaEmPromocao(): boolean {
        return this.preco < 100;
    }
}

Produto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Produto",
        tableName: "produtos",
        timestamps: false, // Não cria colunas createdAt/updatedAt pra manter simples
    }
);

export default Produto;
