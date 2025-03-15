import { NextResponse } from "next/server"
import { NextRequest } from "next/server";
import connect from "@/utils/db";
import notes from "@/models/notes";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connect();

        const { id } = params;

        const userid = request.headers.get("userId");
        
        if (!userid) {
            return new NextResponse("userid cannot be null", { status: 500 });
        }

        const requestednotes = await notes.find({ user: userid, _id: id });

        return new NextResponse(JSON.stringify(requestednotes), { status: 200 });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return new NextResponse("error getting note " + err.message, { status: 500 });
        }
        return new NextResponse("error getting note", { status: 500 });
    }
};
