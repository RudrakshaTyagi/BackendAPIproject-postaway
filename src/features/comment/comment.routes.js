import express from 'express';
import CommentController from './comment.controller.js';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import loggerMiddleware from '../../middlewares/reqLogger.middleware.js';

const commentRouter = express.Router();

const commentController = new CommentController();

commentRouter.use(jwtAuth);
commentRouter.use(loggerMiddleware);

// add comment
commentRouter.post('/:postId',  (req, res, next) => {
      commentController.addComment(req, res, next);
})
// get comments on a post
commentRouter.get('/:postId',  (req, res, next) => {
      commentController.getCommentsOnPost(req, res, next);
});
// delete comment by comment id
commentRouter.delete('/:commentId', (req, res, next) => {
      commentController.deleteComment(req, res, next);
});
// update comment by comment id
commentRouter.put('/:commentId',  (req, res, next) => {
      commentController.updateComment(req, res, next);
});
export default commentRouter;