import mongoose from "mongoose"
import { postSchema } from "./post.schema.js"
import { customErrorHandler } from "../../middlewares/errorHandler.middleware.js";
import { UserModel } from "../user/user.repository.js";

export const PostModel = mongoose.model('Post', postSchema);

export default class PostRepository{

      add = async (userId,postData) => {
            try {
                  const post = new PostModel(postData);
                  post.user = userId;
                  await post.save();
                  return post;
            } catch (err) {
                  throw new customErrorHandler(400, err._message);
            }
      }

      getByUser = async (userId) => {
            // find user
            const user = await UserModel.findById(userId);
            if (!user) {      
                  throw new customErrorHandler(404, "user not found");
            }
            // find all posts user has added
            const posts = await PostModel.find({ user: userId });
            return posts;     
      }

      getAll = async () => {
            try {
                  const posts = await PostModel.find();
                  return posts;
            } catch (err) {
                  throw new customErrorHandler(500, "could not retrieve posts");
            }
      }

      getbypostId = async (postId) => {
            const post = await PostModel.findById(postId);
            if (!post) {
                  throw new customErrorHandler(404, "post not found");
            }
            return post;
      }

      delete = async (userId, postId) => {
            // only user who has added the post can delete it
            const post = await PostModel.findOne({ _id: postId, user: userId });
            if (!post) {
                  throw new customErrorHandler(400, "you are not authorized to delete");
            }
            await PostModel.findByIdAndDelete(postId);
            return post;
      }

      update = async (userId, postId, caption) => {
            // only user who has added post can update it
           
            const post = await PostModel.findOne({ _id: postId, user: userId });

            if (!post) {
                  throw new customErrorHandler(400, "you are not authorized to update");
            } else {

                  const updatedPost = await PostModel.findByIdAndUpdate(
                        postId,
                        { $set: { caption: caption } },
                        { new: true, runValidators: true }
                  );
                  return updatedPost;
            }
      };
};