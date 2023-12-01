'use server'

import { MongoClient } from 'mongodb';

const uri = JSON.parse(JSON.stringify(process.env.MONGODB_URI));

const client = new MongoClient(uri);

export async function connectToDatabase() {
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }
  return client.db(process.env.MONGODB_DB);
}





