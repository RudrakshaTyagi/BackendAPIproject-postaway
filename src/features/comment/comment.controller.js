import mongoose from "mongoose";
import CommentRepository from "./comment.repository.js";

export default class CommentController{
      constructor() {
            this.commentRepository = new CommentRepository();
      }

      addComment = async (req, res, next) => { // post a comment
            try {
                  const postId = new mongoose.Types.ObjectId(req.params.postId);
                  const userId = new mongoose.Types.ObjectId(req.userId);
                  const { text } = req.body;

                  const commentData = { // create the data
                        text: text,
                        user: userId,
                        post: postId
                  };
                  // add the data
                  const comment = await this.commentRepository.add(commentData);
                  res.status(201).send({ msg: "comment added", comment });
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      }

      getCommentsOnPost = async (req, res, next) => { // get all comments on a post
            try {
                  const postId = new mongoose.Types.ObjectId(req.params.postId);
                  
                  const comments = await this.commentRepository.getByPostId(postId);
                  if (comments.length === 0) {
                        res.status(404).send("no comment found on the post");
                  } else {
                        res.status(200).send(comments);
                  }
                  
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      }

      deleteComment = async (req, res, next) => { // delete a comment
            try {
                  const commentId = new mongoose.Types.ObjectId(req.params.commentId);
                  const userId = new mongoose.Types.ObjectId(req.userId);
                      
                  const comment = await this.commentRepository.delete(userId,commentId);
                  res.status(200).send({ msg: "comment deleted", comment });
                  
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      }
 
      updateComment = async (req, res, next) => {  // update a comment
            try {
                  const userId = new mongoose.Types.ObjectId(req.userId);
                  const commentId = new mongoose.Types.ObjectId(req.params.commentId);
                  const { text }  = req.body;  

                  const updatedComment = await this.commentRepository.update(userId, commentId, text);
                  
                  res.status(200).send({ msg: "comment updated", updatedComment });
                  
                  
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      };
};