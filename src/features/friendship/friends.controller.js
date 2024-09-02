import mongoose from "mongoose"
import FriendRepository from "./friends.repository.js";

export default class FriendController{

      constructor() {
            this.friendRepository = new FriendRepository();
      }

      getAllfriends = async (req, res, next) => {
            // get all friends of a particular user
            try {
                  const userId = new mongoose.Types.ObjectId(req.params.userId);
                  const friends = await this.friendRepository.getAll(userId);
                  if (friends.length === 0) {
                        res.status(404).send("no friends found");
                  } else {
                        res.status(200).send(friends);
                  }
                  
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      }

      getPendingRequests = async (req, res, next) => {
            try {
                  // get all requests the user has respond to
                  const userId = new mongoose.Types.ObjectId(req.userId);
                  const requests = await this.friendRepository.getPending(userId);
                  if (requests.length === 0) {
                        res.status(404).send("no pending requests");
                  } else {
                        res.status(200).send(requests);
                  }
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      };
      
      toggleFriendship = async (req, res, next) => {
            // remove a friend or send a friend request
            try {
                  const userId = new mongoose.Types.ObjectId(req.userId);
                  const friendId = new mongoose.Types.ObjectId(req.params.friendId);
              
                  if (userId.equals(friendId)) {
                        return res.status(400).send("Operation not allowed");
                  }
              
                  const friend = await this.friendRepository.toggle(userId, friendId);
                  return res.status(200).send({ msg: friend.result, friend: friend.msg });
            } catch (err) {
                  console.log("Passed to error handler", err);
                  next(err);
            }
      };
              

      respondToRequest = async (req, res, next) => {
            // accept or reject a request
            try {
                  const userId = new mongoose.Types.ObjectId(req.userId);
                  const friendId = new mongoose.Types.ObjectId(req.params.friendId);
                  
                  const { option } = req.body;
                  if (option != "accept" && option != "reject") {
                        res.status(400).send("invalid option");
                  }

                  const response = await this.friendRepository.respond(userId, friendId, option);
                  res.status(201).send(response.msg);
                  
            } catch (err) {
                  console.log("passed to error handler");
                  next(err);
            }
      }
};