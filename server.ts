import express, { Express, Request, Response } from 'express';
import { connectToDatabase } from "./services/database.service"
import { products } from "./products"

const app: Express = express();

const port = 3000;

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    })

app.get('/', (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.status(200).send(JSON.stringify(products));
    console.log("GET")
});

app.post('/', (req: Request, res: Response) => {
    res.send('Got a POST request')
});

app.put('/user', (req: Request, res: Response) => {
    res.send('Got a PUT request at /user')
});

app.delete('/user', (req: Request, res: Response) => {
    res.send('Got a DELETE request at /user')
});


