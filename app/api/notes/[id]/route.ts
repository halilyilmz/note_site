import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connect from "@/utils/db";
import notes from "@/models/notes";


export const GET = async (request: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    await connect();

    const userid = request.headers.get("userId");

    if (!userid) {
      return new NextResponse("userid cannot be null", { status: 400 });
    }

    const requestedNotes = await notes.find({ user: userid, _id: id });

    return new NextResponse(JSON.stringify(requestedNotes), { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return new NextResponse("Error getting note: " + err.message, { status: 500 });
    }
    return new NextResponse("Error getting note", { status: 500 });
  }
};
