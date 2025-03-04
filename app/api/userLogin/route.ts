import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
    try {
        
        const body =await  request.json();
        await connect();

        const user = await User.findOne({username:body.username});
        if (!user) {
            return new NextResponse("Wrong username or password", { status: 401 });
        }

        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            return new NextResponse("Wrong username or password", { status: 401 });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        const setcookies=await cookies();

        setcookies.set("token",token)

        return new NextResponse("loged in", {status: 200});

    } catch (err: any) {
        return new NextResponse("Error logging in: " + err.message, { status: 500 });
    }
};
