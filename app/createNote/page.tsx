'use client'
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/navbarLogedin';

const Page = () => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [updateNotesCounter, setUpdateNotesCounter] = useState(0);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const token = getCookie("token");
        const res = await fetch("/api/notes", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: "include",
        });

        const fetchedNotes = await res.json();
        console.log(fetchedNotes.message);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }

    fetchNotes();
  }, [updateNotesCounter]);

  async function updateNote() {
    const token = getCookie("token");

    const res = await fetch(`/api/notes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: text }),
    });

    const resj = await res.json();
    return resj;
  }

  const handleUpdateClick = async () => {
    const response = await updateNote();
    if (response.message) {
      window.location.replace("/");
    }
  };

  return (
    <>
      <div className='w-screen h-screen flex flex-col'>
        {Navbar && <Navbar />}
        <div className='flex flex-col justify-center items-center w-screen flex-grow bg-gray-200 text-black'>
          <span className='self-start ml-[20%] text-3xl'>Create Note</span><br />
          <textarea
            className='w-[60%] h-56'
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={inputRef}
          ></textarea>
          <button
            onClick={handleUpdateClick}
            className='m-2 mt-4 w-48 h-12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
            update
          </button>
        </div>
      </div>
    </>
  );
}

function getCookie(name: string): string | null {
  if (typeof window !== "undefined") {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => cookie.substring(0, nameLenPlus) === `${name}=`)
      .map(cookie => decodeURIComponent(cookie.substring(nameLenPlus)))
      [0] || null;
  }
  return null;
}

export default Page;
