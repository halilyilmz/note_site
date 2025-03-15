import { NextResponse } from "next/server"
import { NextRequest } from "next/server";
import connect from "@/utils/db";
import notes from "@/models/notes";



export const GET=async(request:NextRequest,{ params }:any)=>{
    try{
        await connect();

        const {id}=await params;

        const userid:string|null=request.headers.get("userId")
        
        if(userid==null){
            return new NextResponse("userid cannot be null ",{status:500})
        }
        
        
        let requestednotes= await notes.find({ user:userid , _id:id });


        return new NextResponse(JSON.stringify(requestednotes),{status:200});
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            return new NextResponse("error geting note " + err.message, { status: 500 });
        }
        return new NextResponse("error geting note", { status: 500 });
    }
  }
  