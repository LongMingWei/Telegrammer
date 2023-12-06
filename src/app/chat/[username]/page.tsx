'use client'

import Image from 'next/image';
import { signOut } from '../../../../auth';
import { useRouter } from 'next/navigation';
import Change from '@/components/change'
import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, getMessages, getContacts } from '@/components/data'
import UserData from '@/components/users'
import clsx from 'clsx';

function SpeechBubble(props) {
  const isSent = props.status === 'sent';
  const isReceived = props.status === 'received';

  return (
    <div
      className={clsx(
        'relative p-4 w-72 mt-4 rounded-lg break-words',
        {
          'bg-lime-600 text-white mr-auto': isReceived,
          'bg-green-500 text-white ml-auto': isSent,
        }
      )}
    >
      <h1>{props.message}</h1>
      <p className='text-xs'>{props.time}</p>
    </div>
  );
}

function Contact(props) {
  return (<div className='relative p-4 w-80 mx-auto mb-2 border border-black bg-lime-700 hover:bg-lime-600 text-white rounded-lg text-left'>
      <h1 className='font-bold'>{props.contact}</h1>
      <p className='text-xs overflow-ellipsis overflow-hidden'>{props.latestMessage}</p>
  </div>)
}

export default function Chat({ params }: { params: { username: string } }) {
  const username = params.username;
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [allMessages, setAllMessages] = useState<{ message: string; time: Date; status: string }[]>([]);
  const [allContacts, setAllContacts] = useState<{ contactName: string; latestMessage: string }[]>([]);
  const [currentContact, setCurrentContact] = useState('');
  const messagesContainerRef = useRef(null);
  const prevMessagesLengthRef = useRef(0);
  
  async function Send() {
    if (message != "" && contact != "") {
      sendMessage(username, contact, message);
      setMessage('');
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

  useEffect(() => {
    const fetchData = async () => {
      if (contact !== currentContact) {
        setCurrentContact(contact);
        const messages = await getMessages(username, contact);
        setAllMessages(messages);
      }
    };

    fetchData();
  }, [contact, username, currentContact]);

  useEffect(() => {
    if (prevMessagesLengthRef.current < allMessages.length) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
    prevMessagesLengthRef.current = allMessages.length;
  }, [allMessages]);

  return (
  <main className="flex min-h-screen bg-white">
    <div className="bg-lime-500 max-h-screen">
      <div className="w-1/4 p-10">

  <div className="flex">
    <div className="hs-dropdown relative inline-flex mb-4 w-80">
      <button id="hs-dropdown-basic" type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 font-medium rounded-lg border border-black bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-lime-700 dark:border-gray-700 dark:text-white dark:hover:bg-lime-500">
        {username}
        <svg className="hs-dropdown-open:rotate-180 w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>

      <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 max-w-xs hidden z-10 mt-2 min-w-[15rem] border border-black bg-lime-600" aria-labelledby="hs-dropdown-unstyled">
      <button type="button" className="bg-lime-600 w-full text-white text-left block justify-center p-3 rounded-md hover:bg-lime-500" data-hs-overlay="#change">
        Change Password
      </button>
      <form action={async () => {await signOut();}}>
        <button className="bg-lime-600 w-full text-white text-left block justify-center p-3 rounded-md hover:bg-lime-500">
          Sign Out
        </button> 
      </form> 
      </div>

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
          <UserData setContact={setContact} username={username}/>
        </div>
      </div>
    </div>
    </div>
    
  <button
  type="button"
  className="bg-lime-700 w-fit h-fit ml-3 text-white flex items-center justify-center rounded-full hover:bg-lime-600"
  data-hs-overlay="#new">
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"> <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/> </svg>
<p>New Message</p>
</button>

</div>

<div className="flex-grow max-h-screen">
{allContacts.map((contacter, index) => (
  <button key={index} onClick={() => setContact(contacter.contactName)}><Contact key={index} latestMessage={contacter.latestMessage} contact={contacter.contactName} /></button>
))}
</div>

</div>
</div>


<div className="w-3/4 p-4 flex flex-col h-full min-h-screen bg-white overflow-hidden max-h-screen">

  <h2 className="font-bold text-lime-500 text-2xl text-center">{contact === "" ? "Select a user to start chatting!":contact}</h2>
 
  <div className="flex-grow overflow-y-auto max-h-screen" ref={messagesContainerRef}>
    {allMessages.map((msg, index) => (
      <SpeechBubble
        key={index}
        message={msg.message}
        time={(msg.time.getHours() < 10 ? '0' : '') + msg.time.getHours() + ":" + (msg.time.getMinutes() < 10 ? '0' : '') + msg.time.getMinutes() + ", " + msg.time.getDate() + "/" + (msg.time.getMonth() + 1) + "/" + msg.time.getFullYear()}
        status={msg.status}
      />
    ))}
  </div>

  
  <div className="flex items-center mt-auto ml-auto mr-auto">
    <input
      className="rounded-l-md mt-1 p-3 items-center border border-black rounded-md w-96 bg-gray-100 text-gray-700"
      placeholder="Enter message"
      required
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button
      type="button"
      className="flex-shrink-0 flex items-center px-2 focus:outline-none"
      onClick={Send}
    >
      <svg className="h-5 w-5 text-white" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>

</div>

</main>
  )
}
