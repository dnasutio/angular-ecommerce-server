import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Product from "../models/product";

export const productsRouter = express.Router();

productsRouter.use(express.json());

// Get all products
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


// Get product with id
productsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    console.log(id)

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


// Creates new product
productsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newProduct = req.body as Product;
        if (!newProduct.id) {
            newProduct.id = new ObjectId();
        }
        console.log(req.body)
        if (collections.products) {
            const result = await collections.products.insertOne(newProduct);

            result
                ? res.status(201).send(`Successfully created a new Product with id ${result.insertedId}`)
                : res.status(500).send("Failed to create a new Product.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});


// Updates existing product
productsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    console.log(req.body)

    try {
        const updatedProduct: Product = req.body as Product;
        const query = { _id: new ObjectId(id) };
        if (collections.products) {
            const result = await collections.products.updateOne(query, { $set: updatedProduct });

            result
                ? res.status(200).send(`Successfully updated Product with id ${id}`)
                : res.status(304).send(`Product with id: ${id} not updated`);
        }


    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});


// Deletes product with id
productsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        if (collections.products) {
            const result = await collections.products.deleteOne(query);

            if (result && result.deletedCount) {
                res.status(202).send(`Successfully removed Product with id ${id}`);
            } else if (!result) {
                res.status(400).send(`Failed to remove Product with id ${id}`);
            } else if (!result.deletedCount) {
                res.status(404).send(`Product with id ${id} does not exist`);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// Deletes selected products
productsRouter.post("/deleteProducts", async (req: Request, res: Response) => {
    console.log("Request ", req.body.products);
    const productIds = req.body.products;
    console.log("Ids", productIds)

    let formattedIds = [];
    for (const id of productIds) {
        console.log("id ", id);
        let formatted = new ObjectId(id);
        formattedIds.push(formatted);
    }

    console.log("Formatted:", formattedIds);

    try {
        if (collections.products) {
            const selected = { _id: { $in: formattedIds } };
            const result = await collections.products.deleteMany(selected);

            if (result && result.deletedCount) {
                res.status(202).send(`Successfully removed Products with ids ${productIds}`);
            } else if (!result) {
                res.status(400).send(`Failed to remove Products with ids ${productIds}`);
            } else if (!result.deletedCount) {
                res.status(404).send(`Products with ids ${productIds} do not exist`);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});
