'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import { json } from 'stream/consumers'

const MainLogedin = () => {
  const [widhforshowing,setWidhforshowing]=useState("w-[0%]")
  const [widhforshowingbg,setWidhforshowingbg]=useState("w-[0%]")
  const [notes, setNotes] = useState<{ _id: string; user: string; text: string; createdAt: string; updatedAt: string }[]>([]);
  const [inputText,setInputText] = useState("");
  const [chosenNote,setChosenNote] = useState("none")
  const [updateNotes,setUpdateNotes] = useState(0)
  const [IsChanged,setIsChanged]=useState(false);


  function showthatnote(){
    setIsChanged(false)
    setWidhforshowing("w-[80%]")
    setWidhforshowingbg("w-[100%]")
  }

  function hidethatnote(){
    if(IsChanged==true){
      updateOrCreateNote(chosenNote,inputText);
      setUpdateNotes(updateNotes+1);
    }
    
    setWidhforshowing("w-[0%]")
    setTimeout(() => {
      setInputText("")
    
    setWidhforshowingbg("w-[0%]")
    }, 1000);
  }




  useEffect(() => {
    async function fetchNotes() {
      try {
        const token=getCookie('token')
        let res = await fetch("http://localhost:3000/api/notes", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Token'ı Authorization başlığına ekledik
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
        console.log(token)
        let res = await fetch("http://localhost:3000/api/notes", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Token'ı Authorization başlığına ekledik
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
  }, [updateNotes]);

  useEffect(()=>{console.log(inputText)},[inputText])
  
  return (

    
    <>
    <div className='px-5'>welcome</div>
    <div className=' w-full flex justify-center'>
    <button onClick={()=>{showthatnote();setChosenNote("none")}} className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 '>create note</button>
    </div>
    

    <main className='flex-1 w-full bg-white grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 grid-rows-3 gap-2 xl:gap-4 px-2 py-2 xl:px-4 xl:py-4 relative' >

                {notes.map((note)=>{
                  return <div onClick={()=>{showthatnote(); setChosenNote(note._id);console.log(note._id)}} key={note._id} className='w-[100%] h-80 bg-gray-400'><div className='h-[90%] w-[90%]  bg-white bg-opacity-50 text-black p-4 m-[5%] box-border '>{note.text}</div></div>
                })}
                
                <div className={` bg-gray-400 absolute ${widhforshowing} h-[80%] m-[10%] z-20 flex justify-center items-center`}> <textarea onChange={(e)=>{setInputText(e.target.value);setIsChanged(true)}} value={inputText} name="" className=' resize-none w-[90%] h-[90%]  text-black' id=""></textarea></div>
                <div onClick={hidethatnote} className={` bg-gray-700 absolute ${widhforshowingbg} opacity-85 h-full z-10`}></div>

            </main>
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

async function updateOrCreateNote(chosenNote:string,text:string){
  const token=getCookie('token')
  if(chosenNote==="none"){
    let res =await fetch("/api/notes", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Authorization':`bearer ${token}`
      },
      body: JSON.stringify({"text":text})
  });

  res=await res.json();
  console.log(res);
  }else{
    console.log("sended ıd "+chosenNote)
    let res =await fetch("/api/notes", {
      method: "PATCH",
      headers: {
          'Content-Type': 'application/json',
          'Authorization':`bearer ${token}`
      },
      body: JSON.stringify({"text":text,"noteId":chosenNote})
  });

  res=await res.json();
  console.log(res);

  }

}

export default MainLogedin