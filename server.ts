import express, { Express, Request, Response } from 'express';
import { products } from "./products"

const app: Express = express();

const port = 3000;

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
