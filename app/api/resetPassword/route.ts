import React from 'react'
import jwt  from 'jsonwebtoken';
import { NextResponse,NextRequest } from 'next/server'
import { randomBytes, randomFillSync, randomInt, randomUUID } from 'node:crypto'
import { Resend } from 'resend';
import mongoose from 'mongoose';
import Notes from '@/models/notes';
import { jwtVerify } from 'jose';
import User from '@/models/user';
import { emitWarning } from 'node:process';
import connect from '@/utils/db';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET!;

export const POST = async (request: NextRequest) => {
   

    
    try{
        const body=await request.json()
        const resend = new Resend('re_CcPWJ2pE_5CLamFZewzUs1JN4KqZnXFkV');
        const email=body.email
        const newPassword=body.password
        
        const token = jwt.sign({ email ,newPassword }, JWT_SECRET, { expiresIn: "5m" });


        resend.emails.send({
            from: 'notes@resend.dev',
            to: email,
            subject: 'Hello World',
            html: `<a href="http://localhost:3000/api/resetPassword?token=${token}">dogrulamak için tiklayin</a>`
        });
        return new NextResponse(JSON.stringify({message:"link sended to your email"+email}),{status:200});
    }
    catch(err){
        return new NextResponse(JSON.stringify({messege:"error sending email :"+err}),{status:500})
    }
    

    
}




export const GET=async (request:Request)=>{
    try{

        const { searchParams } = new URL(request.url);
        const token: string | null = searchParams.get('token');

        connect()

        if(token==null){
            return new NextResponse(JSON.stringify({message:"error "}),{status:400});
        }

        const buffedtoken=new TextEncoder().encode(JWT_SECRET);

        const { payload } = await jwtVerify(token, buffedtoken);

        if (typeof payload.email !== "string" || typeof payload.newPassword !== "string") {
            return new NextResponse(
                JSON.stringify({ message: "Invalid string or email" }),
                { status: 400 }
            );
        }
        
        const hashedPassword=await bcrypt.hash(payload.newPassword,10)

        const updatedUsers = await User.findOneAndUpdate(
            {email:payload.email},
            {"password": hashedPassword},
            {new:true},
        );
        if(updatedUsers==null){
            return new NextResponse(
                JSON.stringify({ error: "no user found for this email: "}),
                { status: 500, headers: { "Content-Type": "application/json" } }
              );
        }
        const UserName=updatedUsers.username

        return new NextResponse(JSON.stringify({message:"users updated ",UserName}),{status:200});

    }
        catch (err: any) {
            console.error("Error updating notes:", err);
            return new NextResponse(
              JSON.stringify({ error: "Error updating notes: " + err.message }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
          }
          
}