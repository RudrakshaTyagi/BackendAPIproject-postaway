import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
      text: {
            type: String,
            required: true
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
      likes:[{type:mongoose.Schema.Types.ObjectId,ref:'Like'}]
});
