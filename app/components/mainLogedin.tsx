'use client'
import React from 'react'
import { useState,useEffect } from 'react'

const MainLogedin = () => {
  const [notes, setNotes] = useState<{ _id: string; user: string; text: string; createdAt: string; updatedAt: string }[]>([]);
  const [inputText,setInputText] = useState("");
  const [chosenNote,setChosenNote] = useState("none")


  useEffect(() => {
    async function fetchNotes() {
      try {
        const token=getCookie('token')
        const res = await fetch("/api/notes", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            credentials: "include",
        });

        const fetcedNotes = await res.json();
        console.log(fetcedNotes.message); 
        setNotes(fetcedNotes.message)
        
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }

    fetchNotes();
  }, []);
  
  return (

    
    <>
    <div className='px-5'>welcome</div>
    
    <div className='flex w-full bg-green-500'>

    <main className='flex-1 w-[80%]  bg-white grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 grid-rows-3 gap-2 xl:gap-4 px-2 py-2 xl:px-4 xl:py-4 relative' >
        {notes.map((note)=>{
          return <div onClick={()=>{}} key={note._id} className='w-[100%] h-80 bg-gray-400'><div className='h-[90%] w-[90%]  bg-white bg-opacity-50 text-black p-4 m-[5%] box-border '>{note.text}</div></div>
        })}
      </main>

      <div className='max-w-48 flex justify-center bg-gray-400 w-[20%]  '>
      <button onClick={()=>{}} className='m-2 mt-4 w-48 h-12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 '>create note</button>
      </div>        

    </div>
    
            </>
  )
}

function getCookie(name: string): string|null {
	const nameLenPlus = (name.length + 1);
	return document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(cookie => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map(cookie => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0] || null;
}


export default MainLogedin