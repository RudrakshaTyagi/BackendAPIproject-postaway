import mongoose from "mongoose"
import { otpSchema } from "./otp.schema.js"
import otpGenerator from "otp-generator";
import { customErrorHandler } from "../../middlewares/errorHandler.middleware.js";

const OtpModel = mongoose.model('OTP', otpSchema);

export default class OtpRepository{
      generateOTP = async () => {
            // generate otp
            const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false }).toString();
            return otp;
      };

      saveOTP = async (userId, otp) => {
            // save otp
            const newOtp = new OtpModel(
                  {
                        userId: userId,
                        otp: otp
                  }
            ); 
 
            const savedOtp = await newOtp.save();
            return savedOtp;
            
      };

      findOTP = async (userId, otp) => {
            // find otp matching with the user
            return await OtpModel.findOne({ userId: userId, otp: otp });
      };

      deleteOTP = async (userId) => {
            // delete all otp associated with user
            return await OtpModel.deleteMany({ userId });
      };

};
