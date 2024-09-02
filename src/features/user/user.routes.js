
import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';

const userRouter = express.Router();

const userController = new UserController();

// register user
userRouter.post('/signup', (req, res,next)=>{     // not using "next" earlier gave me so much pain
      userController.signUp(req, res, next);
});

// login user
userRouter.post('/signin', (req, res,next)=>{
      userController.signIn(req, res, next);
});

//logout user current device
userRouter.get('/logout',jwtAuth, (req, res,next) => {
      userController.userLogoutCurrent(req, res, next);
})
//logout user all devices
userRouter.get('/logout-all-devices',jwtAuth, (req, res,next) => {
      userController.userLogoutAllDevices(req, res, next);
})

// get user details by userId
userRouter.get('/get-details/:userId', (req, res,next) => {
      userController.getUserById(req, res,next);
});

// get all users detail
userRouter.get('/get-all-details', (req, res,next) => {
      userController.getAllusers(req, res,next);
});

 //update user details by userId
userRouter.put('/update-details/:userId', jwtAuth,(req, res,next) => {
      userController.updateUserDetails(req, res, next);
});
export default userRouter;
