'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useState,useEffect } from 'react'


const page = () => {
    const [id,setid]=useState<string>();
    
    const token=getCookie("token");
    const searchParams=useSearchParams()
    setid(searchParams.get("id")!);



    useEffect(()=>{
        const res= fetch(`/api/notes?id=${id}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          console.log(res)
    },[id])

    return (
    <>

    

    </>
  )
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
  

export default page