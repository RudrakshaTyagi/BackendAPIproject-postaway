import express from 'express';
import LikeController from './like.controller.js';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import loggerMiddleware from '../../middlewares/reqLogger.middleware.js';

const likeRouter = express.Router();

const likeController = new LikeController();

likeRouter.use(jwtAuth);
likeRouter.use(loggerMiddleware);

//toggle like on post
likeRouter.post('/toggle/:id', (req, res, next) => {
      likeController.toggleLike(req, res, next);
});
// get likes for specific post or comment (multiple ref case)
likeRouter.get('/:id', (req, res, next) => {
      likeController.getLikeById(req, res, next);
});
export default likeRouter;