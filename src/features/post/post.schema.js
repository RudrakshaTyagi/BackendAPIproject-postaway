import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
      imgURL: {
            type: String,
            required: true
      },
      caption: {
            type: String,
            required: true
      },
      user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
      likes:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Like' }], // total likes on post
      comments:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}] // total comments on post
});
