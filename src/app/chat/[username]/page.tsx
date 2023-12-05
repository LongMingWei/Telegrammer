'use client'

import Image from 'next/image';
import { signOut } from '../../../../auth';
import { useRouter } from 'next/navigation';
import Change from '@/components/change'
import React, { useState, useEffect } from 'react';
import { sendMessage, getMessages, getContacts } from '@/components/data'
import UserData from '@/components/users'

function SpeechBubble(props) {
  return (<div className='relative p-4 max-w-xs mx-auto mt-4 bg-lime-600 text-white rounded-lg'>
      <h1>{props.message}</h1>
      <p className='text-xs'>{props.time}</p>
  </div>)
}

function Contact(props) {
  return (<div className='relative p-4 w-80 mx-auto border-black bg-lime-700 hover:bg-lime-600 text-white rounded-lg text-left'>
      <h1 className='font-bold'>{props.contact}</h1>
      <p className='text-xs'>{props.latestMessage}</p>
  </div>)
}

export default function Chat({ params }: { params: { username: string } }) {
  const username = params.username;
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [allMessages, setAllMessages] = useState<{ message: string; time: Date; status: string }[]>([]);
  const [allContacts, setAllContacts] = useState<{ contactName: string; latestMessage: string }[]>([]);
  
  async function Send() {
    if (message != "" && contact != "") {
      sendMessage(username, contact, message);
      setMessage('');
      // const messages = await getMessages(username, contact);
      // setAllMessages(messages);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (contact != "") {
        const messages = await getMessages(username, contact);
        setAllMessages(messages);
      }
    };

    const fetchContactData = async () => {
      const contacts = await getContacts(username);
      setAllContacts(contacts);
    };

    fetchData();
    fetchContactData();
  }, [contact, allContacts]);

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-white">
      <div className="relative flex mb-2">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-green-600 mb-2 text-center">Hello, {username}</h1>
            <form action={async () => {await signOut();}}>
              <div className="flex flex-col justify-center mb-4">
                <button className="bg-green-500 text-white justify-center p-3 rounded-md hover:bg-green-600">
                  Sign Out
                </button>
              </div>
            </form> 
        </div>
      </div>


<button type="button" className="bg-green-500 text-white justify-center p-3 rounded-md hover:bg-green-600" data-hs-overlay="#change">
  Change Password
</button>

<div id="change" className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]" data-hs-overlay-keyboard="false">
  <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
    <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto bg-white-800 border-white-700">
      <div className="flex justify-between items-center py-3 px-4">
        <h3 className="font-bold text-gray-800 dark:text-white">
          Change Password
        </h3>
        <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#change">
          <span className="sr-only">Close</span>
          <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <Change name={username}/>
    </div>
  </div>
</div>

<button type="button" className="bg-green-500 text-white justify-center p-3 rounded-md hover:bg-green-600" data-hs-overlay="#new">
  New Message
</button>

<div id="new" className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]" data-hs-overlay-keyboard="false">
  <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
    <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto bg-white-800 border-white-700">
      <div className="flex justify-between items-center py-3 px-4">
        <h3 className="font-bold text-gray-800 dark:text-white">
          Select User
        </h3>
        <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#new">
          <span className="sr-only">Close</span>
          <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <UserData setContact={setContact}/>
    </div>
  </div>
</div>

<div className="relative flex items-stretch">
  <input className="rounded-l-md mt-1 p-3 border border-black rounded-md w-96 bg-gray-100 text-gray-700" placeholder="Enter message" 
  required value={message} onChange={(e) => setMessage(e.target.value)}/>
  <button type="button" className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none" onClick={Send}>
  <svg className="h-5 w-5 text-white" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
  </button>
</div>

{allContacts.map((contacter, index) => (
  <button key={index} onClick={() => setContact(contacter.contactName)}><Contact key={index} latestMessage={contacter.latestMessage} contact={contacter.contactName} /></button>
))}

{allMessages.map((msg, index) => (
  <SpeechBubble key={index} message={msg.message} time={(msg.time.getHours() < 10 ? '0' : '') + msg.time.getHours() + ":" + (msg.time.getMinutes() < 10 ? '0' : '') + msg.time.getMinutes() + ", " + msg.time.getDate() + "/" + (msg.time.getMonth()+1) + "/" + msg.time.getFullYear()} status={msg.status} />
))}

</main>
  )
}
