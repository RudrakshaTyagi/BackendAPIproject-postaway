import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
      
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      likedOn:{type: mongoose.Schema.Types.ObjectId,refPath:'types'}, 
      types: { // it can either like comment or post based on request
            type: String, enum: ['Post', 'Comment']
      }
});
