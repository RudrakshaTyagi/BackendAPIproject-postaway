import express from "express";
import OtpController from "./otp.controller.js";
import loggerMiddleware from "../../middlewares/reqLogger.middleware.js";

const otpRouter = express.Router();

otpRouter.use(loggerMiddleware)

const otpController = new OtpController();

// to send otp
otpRouter.post('/send', (req, res, next) => {
      otpController.sendOtpForPasswordReset(req, res, next);
});
//verify otp
otpRouter.post('/verify', (req, res, next) => {
      otpController.verifyOtp(req, res, next);
});
// reset password
otpRouter.post('/reset-password', (req, res, next) => {
      otpController.resetPassword(req, res, next);
});

export default otpRouter;
