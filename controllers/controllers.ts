import mongoose, { Types } from "mongoose";
import User from "../models/user"; 
import Notes from "../models/notes";
import notes from "../models/notes";

export const createNotes= async(userId: string | Types.ObjectId, inputtext: string)=> {
  // Eğer userId string olarak gelirse, ObjectId'ye çeviriyoruz
  if(typeof(userId) === "string"){
    userId = new mongoose.Types.ObjectId(userId);
  }
  
 
  const notes = new Notes({ user: userId, text:inputtext });
  await notes.save();
  
  const updatedUser= await User.findByIdAndUpdate(userId, { $push: { notes: notes._id } }, { new: true });
 
  return notes;
}

export async function getNotes(userId: string | Types.ObjectId): Promise<any> {
  
  let requestednotes= await notes.find({user:userId}).sort({createdAt:-1});

    return requestednotes;
  }

export async function updateNotes(noteId: string | Types.ObjectId, inputtext: string): Promise<any> {
  if(typeof(noteId) === "string"){
    noteId = new mongoose.Types.ObjectId(noteId);
  }
console.log(noteId);
  const updatedNotes = await Notes.findByIdAndUpdate(
    noteId,
    {$set:{"text": inputtext}},
  );

  return updatedNotes;

}