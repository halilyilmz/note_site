import connect from "@/utils/db";
import User from "@/models/user";
import { NextResponse } from "next/server"
import { hash, compare } from 'bcryptjs';

export const GET= async()=>{
    
    try{
        await connect();
        const users= await User.find();
        return new NextResponse(JSON.stringify(users),{status: 200});
    }
    catch (err:any){
        return new NextResponse("no  users found" + err.message,{status:400})
    }

}

export const POST=async(request:Request)=>{
    try{
        const body=await request.json();
        await connect();

        body.password=await hash(body.password,10);

        const newUser=new User(body);
        await newUser.save();

        return new NextResponse(JSON.stringify({message:"user created"}),{status:200});

    }
    catch (err:any){
        return new NextResponse("error creating user " + err.message,{status:500})
    }
}