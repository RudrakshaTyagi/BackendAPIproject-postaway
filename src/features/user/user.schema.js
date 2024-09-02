import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, "name is required"],
            minLength: [2, "The name should be at least 2 characters long"],
      },

      email: {
            type: String,
            unique: true,
            required: [true, "email is required"],
            match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/], // valid email format regular expression
      },

      password: { type: String, required: [true, "password is required"] },
      tokenVersion: { type: Number, default: 0 },
      gender: { type: String, required: [true, "gender is to be specified"], enum: ["Male", "Female", "Others"] },
      friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }]
      //avatar
      
});
