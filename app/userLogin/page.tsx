'use client'
import React,{useState} from 'react'


const page = () => {

    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [response, setResponse]=useState("");

    async function getmessage(){
        const res =await fetch("/api/userLogin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const resstring=await res.text();
        setResponse(resstring);
    }


  return (
    <div className=' h-screen flex justify-center items-center'>
    <div className="h-2/4 w-96  relative">
      <form  onSubmit={(e)=>{ e.preventDefault(),getmessage()}}  className="flex flex-col bg-red-800 h-full justify-center items-center rounded-xl">
        <label className="text-center px-3 py-1  bg-black text-white">Username</label>
        <input onChange={(e)=>{setUsername(e.target.value)}} type="text" name="username" className="text-black px-1 py-0.5" /> <br />


        <label className="text-center px-3 py-1 bg-black text-white">Password</label>
        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" className="text-black px-1 py-0.5" />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Log In
        </button>

        <a className=' absolute bottom-8 right-24 font-medium text-yellow-500 underline hover:no-underline' href="">forgot your password?</a>
        
      </form>

      

      {response && (
                <p className="mt-4 text-yellow-400 bg-gray-800 p-2 rounded">{response}</p>
            )}
      
    </div>
    </div>
  )
}

export default page