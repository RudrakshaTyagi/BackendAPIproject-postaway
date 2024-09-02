import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserRepository from "./user.repository.js";
import mongoose from "mongoose";
import { sendWelcomeEmail } from "./user.utils.js";
export default class UserController{
      constructor() {
            this.userRepository = new UserRepository();
      }

      signUp = async (req, res, next) => {
            try {
                  let { password } = req.body;
                  password = await bcrypt.hash(password, 12); // hash the password

                  const user = await this.userRepository.signupUser({ ...req.body, password });
                  await sendWelcomeEmail(req.body);

                  res.status(201).json({
                        success: true,
                        msg: "user registration successful",
                        user: user
                  });
                  
            } catch (err) {
                  console.log(err);
                  next(err);
            }
      };
      
      signIn = async (req, res, next) => {
            try {
                  const user = await this.userRepository.signinUser(req.body);
                  const token = jwt.sign( // create jwt token for authentications
                        {
                              userId: user._id,
                              email: user.email,
                        },
                        process.env.JWT_SECRET,
                        {
                              expiresIn: '1h',
                        }
                  );
                  // Send token, store it in cookie
                  res.status(201)
                        .cookie("jwtToken", token, { maxAge: 900000, httpOnly: false })
                        .json({ status: "success", msg: "login successfull", token });
            } catch (err) {
                  console.log("Passed to error handler middleware");
                  next(err);            
            }
      
      };

      userLogoutCurrent = async (req, res, next) => {
            // here we will use jwtAuth so that only logged in user can logout
            try {
                  res.clearCookie("jwtToken").json({ success: true, msg: "logout successful" });
            } catch (err) {
                  console.log("Passed to error handler middleware");
                  next(err);
            }
      };
      
      userLogoutAllDevices = async (req, res, next) => {
            try {
                  const userId = new mongoose.Types.ObjectId(req.userId); // user is authenticated and userId is available in req.user
                  
                  await this.userRepository.incrementTokenVersion(userId);
                 
                  res.clearCookie("jwtToken").json({ success: true, msg: "Logged out from all devices" });
            } catch (err) {
                  console.log("Passed to error handler middleware");
                  next(err);
            }
      };

      getUserById = async (req, res, next) => { 
            try {
                  const userId = new mongoose.Types.ObjectId(req.params.userId);  // extracting like const userId=req.params was not working
                 
                  const user = await this.userRepository.getOneUser(userId);
                  res.status(200).send(user);

            } catch (err) {
                  console.log("Passed to error handler middleware");
                  next(err);
            }        
      };

      getAllusers = async (req, res, next) => {
            try {
                  const users = await this.userRepository.getAllUsers();
                  res.status(200).send(users);
                  
            } catch (err) {
                  console.log("Passed to error handler middleware");
                  next(err);
            }
      }

      updateUserDetails = async (req, res, next) => {
            try {
                  const { name, gender } = req.body;
                  const userId = new mongoose.Types.ObjectId(req.params.userId); // same as get user by id
                  
                  const updatedUser = await this.userRepository.updateUser(userId, name, gender);
                  
                  res.status(200).send(updatedUser);
                  
            } catch (err) {
                  console.log("Passed to error handler middleware");
                  next(err);
            }
      };
};

