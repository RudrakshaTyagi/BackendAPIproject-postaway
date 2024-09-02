import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../../middlewares/errorHandler.middleware.js";
import { userSchema } from "./user.schema.js";

export const UserModel = mongoose.model("User", userSchema);

export default class UserRepository {

      signupUser = async (userData) => {
            try {
                const newUser = new UserModel(userData); // create user
                await newUser.save(); // save user
                return newUser;
            } catch (error) { 
                // Handle duplicate email error (code 11000 is for duplicate key error in MongoDB)
                if (error.code === 11000) {
                    throw new customErrorHandler(400, "Email already registered");
                } 
                
                // Handle validation errors
                if (error.name === 'ValidationError') {
                    // Extract the first validation error message
                      const firstError = Object.values(error.errors)[0];
                      const errorMessage = firstError.message; // This will give you the exact message from the schema
            
                      throw new customErrorHandler(400, errorMessage);
                } else {
                    // Handle other errors
                    throw new customErrorHandler(400, "An unexpected error occurred");
                }
            }
        };
        

      signinUser = async (userData) => {
            {
                  const { email, password } = userData; // first find if email in database exists
                  const user = await UserModel.findOne({ email });
                  if (!user) {
                        throw new customErrorHandler(404, "user not found");
                              
                  } else {
                        // validate the password
                        const passwordValidation = await bcrypt.compare(password, user.password);
                        if (passwordValidation) {               
                              return user;
                        } else {
                              throw new customErrorHandler(400, "invalid credentials");            
                        }
                  }
            }
            
      };

      getOneUser = async (userId) => {

            const user = await UserModel.findById(userId);
            if (!user) {
                  throw new customErrorHandler(404, "user not found");
            } else {
                  return user;
            }
      };
      

      getAllUsers = async () => {
            
            const users = await UserModel.find();
            if (users.length === 0) {
                  throw new customErrorHandler(404, "no user found");
            }
            return users;
            
      };

      updateUser = async (userId, userName, gender) => {
            try {
                  const updateFields = {};
                  if (userName) updateFields.name = userName;
                  if (gender) updateFields.gender = gender;
            
                  // Update user
                  const updatedUser = await UserModel.findByIdAndUpdate(
                        userId,
                        { $set: updateFields },
                        { new: true, runValidators: true } // Return the updated document
                  );
            
                  if (!updatedUser) {
                        throw new customErrorHandler(404, "User not found");
                  }

                  return updatedUser;
            } catch (err) {
                  console.log(err);
                  throw new customErrorHandler(400, err);
            }
            
      };

      incrementTokenVersion = async (userId) => {
            return await UserModel.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } }, { new: true });
      };

};
