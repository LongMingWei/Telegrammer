'use server'

import { connectToDatabase } from '@/components/mongo';

export async function addUser(username: string, password: string) {
    const db = await connectToDatabase();
    const users = db.collection('users');
  
    const existingUser = await users.findOne({ username });
  
    if (existingUser) {
      throw new Error('Username already exists');
    }
  
    const result = await users.insertOne({ username, password });
    return result.insertedId;
  }