'use client'
import React,{useState} from 'react'

const Page = () => {

    const [username, setUsername]=useState<string>("");
    const [newPassword, setNewPassword]=useState<string>("");
    const [response, setResponse]=useState<{message:string}>();
    const [email, setEmail]=useState<string>("");
    const [messegecolor]=useState<string>("text-yellow-400");

    async function getmessage(){
        const res =await fetch("/api/resetPassword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email":email,"password":newPassword })
        });
        let resstring=await res.json();
        setResponse(resstring);
    }


  return (
    <div className=' h-screen flex justify-center items-center'>
    <div className="h-2/4 w-1/2 ">
      <form  onSubmit={(e)=>{ e.preventDefault();getmessage()}}  className="flex flex-col bg-red-700 h-full justify-center items-center rounded-xl">
        <label className=" mt-3 text-center px-3 py-1  bg-black text-white">Email</label>
        <input onChange={(e)=>{setEmail(e.target.value)}} type="text" name="email" className="text-black px-1 py-0.5" />

        <label className=" mt-3 text-center px-3 py-1 bg-black text-white">new password</label>
        <input onChange={(e)=>{setNewPassword(e.target.value)}} type="password" name="newPassword" className="text-black px-1 py-0.5" />

        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Sign Up
        </button>

        
      </form>
      {response && (
                <p className={` mt-4 ${messegecolor} bg-gray-800 p-2 rounded `}>{response.message}</p>
            )}

      
    </div>
    </div>
  )
}

export default Page