import { NextResponse } from "next/server"
import connect from "@/utils/db";

export const GET=async()=>{
    try{


        await connect();

        return new NextResponse("true",{status:200});
        
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            return new NextResponse("error login " + err.message, { status: 500 });
        }
        return new NextResponse("error login"+err, { status: 500 });
    }
    
  }
  