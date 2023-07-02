import { ObjectId } from "mongodb";

export default class Product {
    [x: string]: any;
    constructor(_id: ObjectId, name: string, price: number, description: string, discount: number, stock: number, category: string) {}
}