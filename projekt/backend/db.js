import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: ".config.env" });

async function main() {
    const db = process.env.MONGO_URI;
    const client = new MongoClient(db);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const collections = await client.db("Bus_kastela").collections();

        for (const collection of collections) {
            const items = await collection.find().toArray();
            console.log(`Items from collection ${collection.collectionName}:`);
            items.forEach((item) => console.log(item));
        }
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await client.close();
    }
}

main();
