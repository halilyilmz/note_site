import { Schema,model,models} from "mongoose";
import mongoose from "mongoose";

const NoteSchema=new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
        text:{type :"string",required: true}
    },
    {
        timestamps:true,
    }
)

const notes = models.notes|| model("notes",NoteSchema);

export default notes;