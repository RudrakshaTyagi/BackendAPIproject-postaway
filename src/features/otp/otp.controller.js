import OtpRepository from "./otp.repository.js"
import bcrypt from "bcrypt";
import { sendMail } from "./otp.utils.js";
import { UserModel } from "../user/user.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.middleware.js";

export default class OtpController{
      constructor(){
            this.otpRepository = new OtpRepository();
      };

      sendOtpForPasswordReset = async (req, res, next) => {
            try {
                  const { email } = req.body; // extract email
                  const user = await UserModel.findOne({ email:email }); // find user
        
                  if (!user) { // check if user exists
                        return res.status(404).send({ message: 'User not found' });
                  }
                  
                  const otp = await this.otpRepository.generateOTP(); // generate the otp
                  
                  await this.otpRepository.saveOTP(user._id, otp); // save the otp
                 
                  try { // send otp on mail
                        await sendMail(email, 'Password Reset OTP', `Your OTP for password reset is: ${otp}`);
                       
                        res.status(200).send({ message: 'OTP sent to email' });
                  } catch (err) {
                        console.log(err);
                        throw new customErrorHandler(400, err);
                  }
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      };

      verifyOtp = async (req, res, next) => {
            try {
                  const { email, otp } = req.body; // extract from body
                  const user = await UserModel.findOne({ email }); // find user by email
        
                  if (!user) { // check user exist or not
                        return res.status(404).send({ message: 'User not found' });
                  }
        
                  const otpRecord = await this.otpRepository.findOTP(user._id, otp); // check if otp correct
        
                  if (!otpRecord) {
                        return res.status(400).send({ message: 'Invalid or expired OTP' });
                  }
        
                  res.status(200).json({ message: 'OTP verified' });
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      };

      resetPassword = async (req, res, next) => {
            try {
                  const { email, otp, newPassword } = req.body;
                  const user = await UserModel.findOne({ email });
         
                  if (!user) { //check if user exists
                        return res.status(404).send({ message: 'User not found' });
                  }
        
                  const otpRecord = await this.otpRepository.findOTP(user._id, otp); // verify the otp
                  
                  if (!otpRecord) {
                        return res.status(400).send({ message: 'Invalid or expired OTP' });
                  }

                  if (!newPassword) {
                        return res.status(400).send({ message: "please provide new password" });
                  }
        
                  user.password = await bcrypt.hash(newPassword, 12); // update the password
                  await user.save();
        
                  await this.otpRepository.deleteOTP(user._id); // delete the otp
                  
                  res.status(200).send({ message: 'Password reset successful' });
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      };

};
