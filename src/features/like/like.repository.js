import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { PostModel } from "../post/post.repository.js";
import { CommentModel } from "../comment/comment.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.middleware.js";

const LikeModel = mongoose.model('Like', likeSchema);

export default class LikeRepository{

      toggleLikePost = async (userId, postId) => {
            // check if the post even exits or not
            const post = await PostModel.findById(postId);
            if (!post) {
                  throw new customErrorHandler(400, "post not found to like");
            }
            // check if like is already added or not
            const likeExists = await LikeModel.findOne({ user: userId, likedOn: postId, types: "Post" });

            if (!likeExists) { // like does not exist
                  // add like
                  const newLike = await LikeModel({
                        user: userId,
                        likedOn: postId,
                        types: "Post"
                  });

                  const like = await newLike.save();
                  // push it in likes array of post
                  await PostModel.findByIdAndUpdate(postId, { $push: { likes: like._id } });

                  return { result: "Like added on the post", msg: like };
            } else {
                  // remove the like
                  await LikeModel.findByIdAndDelete(likeExists._id);
                  // remove the like from likes array of post
                  await PostModel.findByIdAndUpdate(postId, { $pull: { likes: likeExists._id } });

                  return { result: "Like removed from the post", msg: likeExists };

            }
      };

      toggleLikeComment = async (userId, commentId) => {
            const post = await CommentModel.findById(commentId);
            if (!post) {
                  throw new customErrorHandler(400, "comment not found to like");
            }
            // check if like is added or not
            const likeExists = await LikeModel.findOne({ user: userId, likedOn: commentId, types: "Comment" });

            if (!likeExists) { // like does not exist
                  // add like
                  const newLike = await LikeModel({
                        user: userId,
                        likedOn: commentId,
                        types: "Comment"
                  });

                  const like = await newLike.save();
                  // push it in likes array of post
                  await CommentModel.findByIdAndUpdate(commentId, { $push: { likes: like._id } });

                  return { result: "Like added on the comment", msg: like };
            } else {
                  // remove the like
                  await LikeModel.findByIdAndDelete(likeExists._id);
                  // remove the like from likes array of post
                  await CommentModel.findByIdAndUpdate(commentId, { $pull: { likes: likeExists._id } });

                  return { result: "Like removed from the comment", msg: likeExists };

            }
      }

      getAllLikes = async (id, type) => {
            
            const likes = await LikeModel.find(
                  {
                        likedOn: id,
                        types: type
                  }
            ).populate('user');
            
            return likes;
      }


};