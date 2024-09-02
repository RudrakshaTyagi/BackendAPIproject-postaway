import express from 'express';
import FriendController from './friends.controller.js';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import loggerMiddleware from '../../middlewares/reqLogger.middleware.js';

const friendRouter = express.Router();

const friendController = new FriendController();

friendRouter.use(jwtAuth);
friendRouter.use(loggerMiddleware);

// get all friends of a user
friendRouter.get('/get-friends/:userId', (req, res, next) => {
      friendController.getAllfriends(req, res, next);
})
// get pending requests
friendRouter.get('/get-pending-requests', (req, res, next) => {
      friendController.getPendingRequests(req, res, next);
})
// toggle friendship with another user
friendRouter.post('/toggle-friendship/:friendId', (req, res, next) => {
      friendController.toggleFriendship(req, res, next);
})
// accept or reject friend request
friendRouter.put('/response-to-request/:friendId', (req, res, next) => {
      friendController.respondToRequest(req, res, next);
})

export default friendRouter;