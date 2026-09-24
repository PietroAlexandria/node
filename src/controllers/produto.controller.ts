import { Request, Response } from "express";
import service from "../services/produto.service";

export const listar = async (req: Request, res: Response) => {
    const produtos = await service.listar();
    res.status(200).json(produtos);
};

export const buscarPorId = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const produto = await service.buscarPorId(id);

    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    res.status(200).json(produto);
};

export const criar = async (req: Request, res: Response) => {
    try {
        const produto = await service.criar(req.body);
        res.status(201).json(produto);
    } catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }
};

export const criarLote = async (req: Request, res: Response) => {
    try {
        const produtos = await service.criarLote(req.body);
        res.status(201).json(produtos);
    } catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }
};

export const atualizar = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const produto = await service.atualizar(id, req.body);

        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }

        res.status(200).json(produto);
    } catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }
};

export const remover = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const sucesso = await service.remover(id);

    if (!sucesso) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    res.status(204).send(); // 204 No Content (deletado com sucesso)
};
