'use server'

import { connectToDatabase } from '@/components/mongo';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import type { User } from '../../definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function addUser(name: string, password: string) {
    noStore();
    if (name === "" || password === "") return null;

    const db = await connectToDatabase();
    const users = db.collection('users');
  
    const existingUser = await users.findOne({ name });
    if (existingUser) return null;
  
    const result = await users.insertOne({ name, password });
    return result;
  }

  export async function changePassword(name: string, old: string, password: string) {
    noStore();
    const db = await connectToDatabase();
    const users = db.collection('users');
  
    const user = await users.findOne({ name });
    if (!user) return false; 
    if (old != user.password) return false;
    
    await users.updateOne({name}, {$set: {password} })
    return true; 
  }

  export async function sendMessage(sender: string, receiver: string, message: string) {
    noStore();
    const db = await connectToDatabase();
    const users = db.collection('users');
  
    const user = await users.findOne({ name: sender });
    if (!user) return false; 
    
    const sentMessage = {
      message: message,
      time: new Date(), 
      status: 'sent', 
    };

    await users.updateOne(
      { name: sender },
      { $push: { [`chat.${receiver}`]: sentMessage } }
    );

    const receivedMessage = {
      message: message,
      time: new Date(), 
      status: 'received', 
    };
    
    await users.updateOne(
      { name: receiver },
      { $push: { [`chat.${sender}`]: receivedMessage } }
    );
    
    return true; 
  }

  export async function getMessages( username: string, contact: string ) {
    noStore();
    const db = await connectToDatabase();
    const users = db.collection('users');

    const messages = await users.aggregate([
      {
        $match: {
          name: username,
          [`chat.${contact}`]: { $exists: true },
        },
      },
      {
        $unwind: `$chat.${contact}`
      },
      {
        $replaceRoot: {
          newRoot: `$chat.${contact}`,
        },
      },
    ]).toArray();
    
    const allMessages = await Promise.all(messages);
    return allMessages;
  }

  export async function getContacts( username: string ) {
    noStore();
    const db = await connectToDatabase();
    const users = db.collection('users');

      const pipeline = [
        {
          $match: {
            name: username,
          },
        },
        {
          $project: {
            _id: 0,
            contacts: { $objectToArray: "$chat" }, 
          },
        },
        {
          $unwind: "$contacts",
        },
        {
          $group: {
            _id: "$contacts.k", 
            latestMessage: { $last: { $last: "$contacts.v.message" } }, 
            time: { $last: { $last: "$contacts.v.time" } }
          },
        },
        {
          $sort: {
            time: -1
          }
        },
        {
          $project: {
            contactName: "$_id",
            latestMessage: 1,
            _id: 0,
          },
        }
      ];

    const result = await users.aggregate(pipeline).toArray();
    return result;
  }

  export async function getUsers() {
    noStore();
    const db = await connectToDatabase();
    const users = db.collection('users');

    const allUsers = await users.find().project({name: 1, _id: 0}).toArray();
    return allUsers;
  }

  export async function deleteContact(username: string, contact: string) {
    noStore();
    const db = await connectToDatabase();
    const users = db.collection('users');

    const result = await users.updateOne(
      { name: username },
      { $unset: { [`chat.${contact}`]: '' } }
    );
  }

  export async function deleteMessage(contact: string) {
    
  }


  export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
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