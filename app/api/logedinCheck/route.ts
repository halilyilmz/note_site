import { NextResponse } from "next/server"
import { NextRequest } from "next/server";
import connect from "@/utils/db";

export const GET=async(request:NextRequest)=>{
    try{
        await connect();

        return new NextResponse("true",{status:200});
  

        
    }
    catch (err:any){
        return new NextResponse("error login " + err.message,{status:500})
    }
  }
  