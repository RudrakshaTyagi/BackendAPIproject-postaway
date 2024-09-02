import mongoose from "mongoose";
import PostRepository from "./post.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.middleware.js";

export default class PostController{

      constructor() {
            this.postRepository = new PostRepository();
      }

      addPost = async (req, res, next) => {
            // create post
            try {
                  const { caption } = req.body;
                  const userId = new mongoose.Types.ObjectId(req.userId);
                  if (!req.file) {
                        throw new customErrorHandler(400, 'File not uploaded');
                  };
                  const { filename } = req.file;    
                  
                  const postData = {
                        imgURL: filename,
                        caption: caption
                  }
                  
                  const createdPost = await this.postRepository.add(userId, postData);
                  
                  res.status(201).send({ 'msg': 'post created', createdPost });
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      };

      getByUserId = async (req, res, next) => {
            // get all posts the user has added
            try {
                  const { userId } = req.body;
                  const id = new mongoose.Types.ObjectId(userId);
                  const post = await this.postRepository.getByUser(id);

                  if (post.length === 0) {
                        res.status(404).send("No post by the user");
                  } else {
                        res.status(200).send(post);
                  }
                  
            } catch (err) {
                  console.log(err);   
                  next(err);
            }
      }            
                

      getAllPosts = async (req, res) => {
            // retrieve all posts on the app
            try {
                  const posts = await this.postRepository.getAll();
                  if (posts.length === 0) {
                        res.status(404).send("no post found");
                  }
                  res.status(200).send(posts);
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      }
      
      getByPostId = async (req, res, next) => {   
            // get a specific post by postId
            try {
                  const postId = new mongoose.Types.ObjectId(req.params.postId);
                  
                  const post = await this.postRepository.getbypostId(postId);
            
                  res.status(200).send(post);
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
            
      }
      
      deletePost = async (req, res, next) => {
      
            try {
                  const postId = new mongoose.Types.ObjectId(req.params.postId);
                  const userId = new mongoose.Types.ObjectId(req.userId);

                  const deleted = await this.postRepository.delete(userId,postId);

                  res.status(200).send({ "msg": "deleted", deleted });
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      }

      updatePost = async (req, res, next) => { // updating the imgURL giving cant set headers error
            try {
                  const postId = new mongoose.Types.ObjectId(req.params.postId);
                  const userId = new mongoose.Types.ObjectId(req.userId);
                  const { caption } = req.body;
                  
                  const updated = await this.postRepository.update(userId, postId, caption);
                  
                  if (!updated) {
                        return res.status(400).send({ msg: "Failed to update post" });
                  } else {
                  
                        res.status(200).send({ msg: "Post updated", updated });
                  }
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      };
        
}
