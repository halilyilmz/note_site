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

        const userid:string|null=request.headers.get("userId")
        
        if(userid==null){
            return new NextResponse("userid cannot be null ",{status:500})
        }
        
        
        let res=await getNotes(userid);

        console.log(res);

        return new NextResponse(JSON.stringify({message:res}),{status:200});
  

        
    }
    catch (err:any){
        return new NextResponse("error geting notes  " + err.message,{status:500})
    }
  }
  

  
export const POST=async(request:Request)=>{
    try{
        const body=await request.json();
        await connect();

        const userid:string|null=request.headers.get("userId")
        
        if(userid==null){
            return new NextResponse("userid cannot be null ",{status:500})
        }

        if(body.text==null||body.text==undefined){
            return new NextResponse("text cannot be null or undefined ",{status:400})
        }


        const res=createNotes(userid,body.text);
        

        return new NextResponse(JSON.stringify({message:"notes created "+res}),{status:200});

    }
    catch (err:any){
        return new NextResponse("error posting notes" + err.message,{status:500})
    }
}
