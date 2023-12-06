'use client'

import { getUsers } from '@/components/data'
import React, { useState, useEffect } from 'react';

function Users(props) {
    return (<div className='relative p-4 max-w-xs mx-auto border-black hover:bg-lime-300 text-green-600 rounded-lg text-left'>
        <h1 className='font-bold'>{props.name}</h1>
    </div>)
  }

export default function UserData({ setContact, username }) {
    const [allUsers, setAllUsers] = useState<{ name: string }[]>([]);;
    const [searchQuery, setSearchQuery] = useState('');
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            // if (searchQuery === '') setAllUsers([]);
            if (false) setAllUsers([]);
            else {
                const users = await getUsers();
                const filteredUsers = users.filter((user) =>
                user.name.toLowerCase().startsWith(searchQuery.toLowerCase()) && 
                user.name.toLowerCase() !== username.toLowerCase()
                );
                setAllUsers(filteredUsers);
            }
          };

        fetchUserData();
      }, [searchQuery]);

      return (
        <div className="pb-10">
          <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">New Message</h2>

          {checked && (
            <div className='text-black text-center text-green-600'>Chat created, close this window to start chatting!</div>
          )}

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for user"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md mb-4 text-black block"
            />
        </div>
      
          {allUsers.map((user, index) => (
            <button key={index} onClick={() => {setContact(user.name); setChecked(true);}}><Users key={index} name={user.name} /></button>
          ))}

        </div>
      );      
}