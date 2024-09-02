import express from 'express';
import PostController from './post.controller.js';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import { upload } from '../../middlewares/fileUpload.middleware.js';
import  loggerMiddleware  from '../../middlewares/reqLogger.middleware.js';
const postRouter = express.Router();

const postController = new PostController();

postRouter.use(jwtAuth);
postRouter.use(loggerMiddleware);

//create post
postRouter.post('/', upload.single('imgURL'), (req, res,next) => {
      postController.addPost(req, res, next);
});
// get by userId
postRouter.get('/', (req, res,next) => {
      postController.getByUserId(req, res, next);
});
// get all posts
postRouter.get('/all', (req, res,next) => {
      postController.getAllPosts(req, res, next);
});
// get by postId
postRouter.get('/:postId', (req, res, next) => {
      postController.getByPostId(req, res, next);
});
// delete
postRouter.delete('/:postId', (req, res, next) => {
      postController.deletePost(req, res, next);
});
// update
postRouter.put('/:postId', (req, res, next) => {
      console.log("problem in route");
      postController.updatePost(req, res, next);
});
export default postRouter;