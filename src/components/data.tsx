'use server'

import { connectToDatabase } from '@/components/mongo';

export async function addUser(username: string, password: string) {
    const db = await connectToDatabase();
    const users = db.collection('users');
  
    const existingUser = await users.findOne({ username });
  
    const result = await users.insertOne({ username, password });
    return result;
  }

  export async function verifyUser(username: string, password: string) {
    const db = await connectToDatabase();
    const users = db.collection('users');
  
    const user = await users.findOne({ username });
  
    if (!user) {
      return null; 
    }
    
    if (user.password === password) {
      return user; 
    }
  
    return null; 
  }

  export async function changePassword(username: string, password: string) {
    const db = await connectToDatabase();
    const users = db.collection('users');
  
    const user = await users.findOne({ username });
  
    if (!user) {
      return null; 
    }
    
    await users.updateOne({username}, {$set: {password} })
    return user; 
  }