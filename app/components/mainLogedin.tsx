'use client'
import React from 'react'
import { useState,useEffect } from 'react'

const MainLogedin = () => {
  const [notes, setNotes] = useState<{ _id: string; user: string; text: string; createdAt: string; updatedAt: string }[]>([]);
  const [inputText,setInputText] = useState("");
  const [chosenNote,setChosenNote] = useState("none")
  const [updateNotesCounter,setupdateNotesCounter]=useState(0);

  let a=0;

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
  }, [updateNotesCounter]);
  
  async function deleteNote(id:string) {
    try {
      const token=getCookie('token')
      const res = await fetch(`/api/notes/delete/${id}`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
          },
          credentials: "include",
      });
  
      const fetcedres = await res.json();
      if(fetcedres.message){
        setupdateNotesCounter(updateNotesCounter+1);
      }
      
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  return (

    
    <>
    <div className='flex justify-center bg-gray-400 bg-opacity-90 w-[100%]  '>
      <a href="/createNote" target='_blank'><button onClick={()=>{}} className='m-2 mt-4 w-48 h-12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 '> create note </button></a>
    </div>


    <div className='px-5 w-full h-3'></div>
    

    <div>
        <div className=' w-full bg-white flex  h-10'>
            <div className='w-[10%] border-r-2 border-gray-900 flex justify-center items-center text-black'>No</div>
            <div className='w-[60%] border-r-2 border-gray-900 flex justify-center items-center text-black'>Note</div>
            <div className='w-[30%] flex justify-center items-center text-black'>interactions</div>
        </div>
        
        {notes.map((note)=>{
            console.log(note._id)
            a=a+1;

          return   <div className='w-full bg-gray-300 flex  h-12 border-black border-t-2' key={note._id}>
                        <div className='w-[10%] border-r-2 border-gray-900 flex justify-center items-center text-black'>{a}</div>
                        <div className='w-[60%] border-r-2 border-gray-900 flex justify-center items-center text-black'>{note.text}</div>
                        <div className='w-[30%] flex justify-center items-center text-black'> <a href={"/note?id="+note._id}><button onClick={()=>{}} className=' flex items-center justify-center w-10 h-10 focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 rounded-lg  dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700'>
                                                                                                  <svg className="w-[60%] h-[60%] text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/></svg>
                                                                                                </button></a>
                                                                                                <button onClick={()=>{deleteNote(note._id)}} className='ml-5 flex items-center justify-center w-10 h-10 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
                                                                                                  <svg className="w-[60%] h-[60%] text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/></svg>
                                                                                                </button>
                        </div>
                   </div>


        })}

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