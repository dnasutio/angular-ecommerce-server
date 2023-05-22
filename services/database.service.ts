import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { products?: mongoDB.Collection } = {}

export async function connectToDatabase() {
    dotenv.config();

    let client: mongoDB.MongoClient;
    if (process.env.DB_CONN_STRING) {
        client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    } else {
        throw new Error("DB_CONN_STRING not set.");
    }

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    let productsCollection: mongoDB.Collection;
    if (process.env.PRODUCTS_COLLECTION_NAME) {
        productsCollection = db.collection(process.env.PRODUCTS_COLLECTION_NAME);
    } else {
        throw new Error("PRODUCTS_COLLECTION_NAME not set.");
    }

    collections.products = productsCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${productsCollection.collectionName}`);
}