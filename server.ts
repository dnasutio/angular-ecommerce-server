import express, { Express } from "express";
import { connectToDatabase } from "./services/database.service"
import { productsRouter } from "./routes/products.router";
import cors from "cors";

const app: Express = express();

const port = 3000;
const allowedOrigins = ['http://localhost:4200'];

connectToDatabase()
    .then(() => {
        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };

        // Then pass these options to cors:
        app.use(cors(options));
        app.use(express.json());

        app.use("/products", productsRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
