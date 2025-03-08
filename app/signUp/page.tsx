'use client'
import React,{useState} from 'react'

const Page = () => {

    const [username, setUsername]=useState<string>("");
    const [password, setPassword]=useState<string>("");
    const [response, setResponse]=useState<string>("");
    const [email, setEmail]=useState<string>("");
    const [messegecolor, setMessegecolor]=useState<string>("text-yellow-400");

    async function getmessage(){
        const res =await fetch("/api/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password,email })
        });
        let resstring=await res.text();
        if(resstring === "{\"message\":\"user created\"}"){
            setMessegecolor("text-green-400");
            resstring="user is created"
            window.location.href="/homepage"
        }
        setResponse(resstring);
    }


  return (
    <div className=' h-screen flex justify-center items-center'>
    <div className="h-2/4 w-1/2 ">
      <form  onSubmit={(e)=>{ e.preventDefault();getmessage()}}  className="flex flex-col bg-red-700 h-full justify-center items-center rounded-xl">
        <label className=" mt-3 text-center px-3 py-1  bg-black text-white">Username</label>
        <input onChange={(e)=>{setUsername(e.target.value)}} type="text" name="username" className="text-black px-1 py-0.5" />

        
        <label className=" mt-3 text-center px-3 py-1  bg-black text-white">Email</label>
        <input onChange={(e)=>{setEmail(e.target.value)}} type="text" name="email" className="text-black px-1 py-0.5" />

        <label className=" mt-3 text-center px-3 py-1 bg-black text-white">Password</label>
        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" className="text-black px-1 py-0.5" />

        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Sign Up
        </button>

        
      </form>
      {response && (
                <p className={` mt-4 ${messegecolor} bg-gray-800 p-2 rounded `}>{response}</p>
            )}

      
    </div>
    </div>
  )
}

export default Page