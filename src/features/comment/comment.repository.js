import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.middleware.js";
import { PostModel } from "../post/post.repository.js";

export const CommentModel = mongoose.model('Comment', commentSchema);

export default class CommentRepository{

      add = async (commentData) => {
            try {
                  
                  const newComment = new CommentModel(commentData);
                  await newComment.save();

                  // push the comment in comments array of postModel
                  await PostModel.findByIdAndUpdate(
                        commentData.post,
                        { $push: { comments: newComment._id } },
                        { new: true, runValidators: true }
                    );

                  return newComment;
            } catch (err) {
                  console.log(err);
                  throw new customErrorHandler(400, err._message);
            }
      
      }

      getByPostId = async (postId) => {
            // get all comments on post
            
            const post = await PostModel.findById(postId).populate('comments');
            
            if (!post) {
                  throw new customErrorHandler(404, 'Post not found');
            }
            return post.comments;
      };

      delete = async (userId,commentId,text) => {
            
            // only the user which has added comment can remove it
            const comment = await CommentModel.findOneAndDelete({ _id: commentId, user: userId});
            if (!comment) {
                  throw new customErrorHandler(400, "comment not found by the user to delete");
            }
            return comment;
      }

      update = async (userId, commentId,text) => {
            // user who has added comment can update it
            
            const comment = await CommentModel.findOneAndUpdate(
                  { _id: commentId, user: userId },
                  { $set: { text: text } },
                  { new: true, runValidators: true }
            );
            
            if (!comment) {
                  throw new customErrorHandler(400, 'You are not authorized to update or comment not found');
            }

            return comment;
      };

};