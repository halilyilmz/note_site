'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/navbarLogedin';
import { useParams } from "next/navigation";

const Page = () => {
  const [text, setText] = useState("");
  const [noteId, setNoteId] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  
  const { id } = useParams();


  const token = getCookie("token");
  const searchParams = useSearchParams();
  console.log(id)

  useEffect(() => {
    let createdattime = " ";
    let updatedattime = " ";

    async function getnote(id: string) {
      const res = await fetch(`/api/notes/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return data;
    }

    getnote(id!).then((data) => {
      console.log(data);
      setText(data[0].text);
      setNoteId(data[0]._id);

      for (let a = 0; a < 15; a++) {
        if (a == 10) {
          createdattime += " ";
        } else {
          createdattime += data[0].createdAt[a];
        }
      }

      for (let a = 0; a < 15; a++) {
        if (a == 10) {
          updatedattime += " ";
        } else {
          updatedattime += data[0].updatedAt[a];
        }
      }

      setCreatedAt(createdattime);
      setUpdatedAt(updatedattime);

      console.log();
    });

  }, [id, token]);

  return (
    <>
      <div className='w-screen h-screen flex flex-col'>
        {Navbar && <Navbar />}
        <div className='flex flex-col justify-center items-center w-screen flex-grow bg-gray-200 text-black'>
          <span className='self-start ml-[20%] text-3xl'>Note Information</span><br />
          <span className='self-start ml-[20%]'>id : {noteId}</span>
          <span className='self-start ml-[20%]'>created at : {createdAt}</span>
          <span className='self-start ml-[20%]'>last updated at : {updatedAt}</span>
          <br />
          <textarea
            className='w-[60%] h-56'
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={inputRef}
          ></textarea>
          <button
            onClick={() => {
              updatenote(noteId, inputRef.current!.value).then((res) => {
                if (res.message) {
                  window.location.replace("/");
                }
              });
            }}
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
  return null; // Eğer sunucu tarafında isek, null döner
}

async function updatenote(noteId: string, text: string) {
  const token = getCookie("token");

  const res = await fetch(`/api/notes`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ noteId: noteId, text: text })
  });

  console.log(res)

  const resj = await res.json();
  return resj;
}

export default Page;
