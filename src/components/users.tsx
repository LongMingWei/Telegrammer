'use client'

import { getUsers } from '@/components/data'
import React, { useState, useEffect } from 'react';

function Users(props) {
    console.log(props.key)
    return (<div className='relative p-4 max-w-xs mx-auto border-black hover:bg-lime-300 text-green-600 rounded-lg text-left'>
        <h1 className='font-bold'>{props.name}</h1>
    </div>)
  }

export default function UserData({ setContact }) {
    const [allUsers, setAllUsers] = useState<{ name: string }[]>([]);;
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (searchQuery === '') setAllUsers([]);
            else {
                const users = await getUsers();
                const filteredUsers = users.filter((user) =>
                user.name.toLowerCase().startsWith(searchQuery.toLowerCase())
                );
                setAllUsers(filteredUsers);
            }
          };

        fetchUserData();
      }, [searchQuery]);

      return (
        <div className="pb-10">
          <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">Select User</h2>

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Type to start searching"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md mb-4 text-black block"
            />
        </div>
      
          {allUsers.map((user, index) => (
            <button onClick={() => setContact(user.name)}><Users key={index} name={user.name} /></button>
          ))}
        </div>
      );      
}