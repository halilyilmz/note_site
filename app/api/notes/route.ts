import { NextResponse } from "next/server"
import { NextRequest } from "next/server";
import { getNotes, updateNotes } from "@/controllers/controllers";
import connect from "@/utils/db";
import { createNotes } from "@/controllers/controllers";

export const GET=async(request:NextRequest)=>{
    try{
        await connect();

        const userid:string|null=request.headers.get("userId")
        
        if(userid==null){
            return new NextResponse("userid cannot be null ",{status:500})
        }
        
        
        let res=await getNotes(userid);

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

export const PATCH=async (request:Request)=>{
    try{
        const body=await request.json();

        const noteid:string|null=body.noteId;

        console.log("geted noteid"+noteid+" geted text"+body.text);

        if(body.text==null||body.text==undefined){
            return new NextResponse(JSON.stringify("text cannot be null or undefined "),{status:400})
        }
        
        if(noteid==null){
            return new NextResponse(JSON.stringify("noteId cannot be null "),{status:500})
        }

       


        const res=await updateNotes(noteid,body.text)
        

        return new NextResponse(JSON.stringify({message:"notes updated "+res}),{status:200});

    }
        catch (err: any) {
            console.error("Error updating notes:", err);
            return new NextResponse(
              JSON.stringify({ error: "Error updating notes: " + err.message }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
          }
          
}