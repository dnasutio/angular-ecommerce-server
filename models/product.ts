import { ObjectId } from "mongodb";

export default class Product {
    constructor(name: string, price: number, description: string, discount: number, stock: number, category: string, public id?: ObjectId) {}
}