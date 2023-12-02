'use server'

import { connectToDatabase } from '@/components/mongo';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import type { User } from '../../definitions';

export async function addUser(username: string, password: string) {
    if (username === "" || password === "") return null;

    const db = await connectToDatabase();
    const users = db.collection('users');
  
    const existingUser = await users.findOne({ username });
    if (existingUser) return null;
  
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

  export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      const name = await signIn('credentials', formData);
      return name;
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Incorrect username or password';
          default:
            return 'Something went wrong';
        }
      }
      throw error;
    }
  }