import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connect from "@/utils/db";
import notes from "@/models/notes";

export const DELETE = async (request: NextRequest, { params }: any) => {
    try {
        await connect();

        const { id } = await params;

        const deletedNote = await notes.deleteOne({ _id: id });

        if (deletedNote.deletedCount === 0) {
            return new NextResponse(JSON.stringify({ message: "Note not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: "Note deleted successfully" }), { status: 200 });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return new NextResponse("Error deleting note: " + err.message, { status: 500 });
        }
        return new NextResponse("Error deleting note", { status: 500 });
    }
};
