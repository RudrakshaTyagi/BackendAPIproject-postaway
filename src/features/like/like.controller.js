import mongoose from "mongoose";
import LikeRepository from "./like.repository.js";

export default class LikeController{
      constructor() {
            this.likeRepository = new LikeRepository();
      }

      toggleLike = async (req, res, next) => {
            try {
                  const userId = new mongoose.Types.ObjectId(req.userId);
                  const id = new mongoose.Types.ObjectId(req.params.id);
                  const { type } = req.body;

                  if (type != "Post" && type != "Comment") {
                        return res.status(400).send("invalid");
                  }

                  if (type == "Post") {
                        const like=await this.likeRepository.toggleLikePost(userId, id);
                        res.status(201).send({ msg:like.result, like:like.msg });
                  } else {
                        const like = await this.likeRepository.toggleLikeComment(userId, id);
                        res.status(201).send({ msg: like.result, like:like.msg });
                  }
                  
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      }

      // get all likes on a post or comment
      getLikeById = async (req, res, next) => {
            try {
                  const id = new mongoose.Types.ObjectId(req.params.id);
                  const { type } = req.body;

                  if (type != "Post" && type != "Comment") {
                        res.status(400).send("invalid");
                  } else {
                        const likes = await this.likeRepository.getAllLikes(id, type);
                        if (likes.length === 0) {
                              res.status(404).send("no likes found")
                        } else {
                              res.status(200).send(likes);
                        }
                  }
                  
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      };
      
};

