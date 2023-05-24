import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Product from "../models/product";

export const productsRouter = express.Router();

productsRouter.use(express.json());

productsRouter.get("/", async (_req: Request, res: Response) => {
    try {
        if (collections.products) {
            const products = (await collections.products.find({}).toArray()) as Product[];
            console.log(products)
            res.status(200).send(products);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {

        const query = { _id: new ObjectId(id) };

        if (collections.products) {
            const product = (await collections.products.findOne(query)) as Product;

            if (product) {
                res.status(200).send(product);
            }
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
