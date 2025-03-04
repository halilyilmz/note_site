import { NextResponse } from "next/server"
import { NextRequest } from "next/server";
import notes from "@/models/notes";
import { getNotes } from "@/controllers/controllers";
import connect from "@/utils/db";
import { get } from "http";
import { cookies } from "next/headers";
import { createNotes } from "@/controllers/controllers";

export const GET=async(request:NextRequest)=>{
    try{
        await connect();

        return new NextResponse("true",{status:200});
  

        
    }
    catch (err:any){
        return new NextResponse("error login " + err.message,{status:500})
    }
  }
  