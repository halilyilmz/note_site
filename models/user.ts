import { Schema,model,models} from "mongoose";
import mongoose from "mongoose";

const UserSchema=new Schema(
    {
        email:{type:"string",required:true,unique:true},
        username:{type:"string",required:true,unique:true},
        password:{type:"string",required:true},
        notes:[{ type: mongoose.Schema.Types.ObjectId, ref: "notes"}]
    },
    {
        timestamps:true,
    }
)

const User = models.User|| model("User",UserSchema);

export default User;