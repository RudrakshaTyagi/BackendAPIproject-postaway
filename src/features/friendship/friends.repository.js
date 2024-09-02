import mongoose from "mongoose";
import { friendSchema } from "./friends.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.middleware.js";
import { UserModel } from "../user/user.repository.js";

export const FriendModel = mongoose.model('Friend', friendSchema);

export default class FriendRepository{

      getAll = async (userId) => {
            // find is the user exits or not
            const user = await UserModel.findById(userId);
            if (!user) {
                  throw new customErrorHandler(400, "user doesnt exist");
            }
            // find all where user is present and status is accepted
            const friends = await FriendModel.find({
                  $or: [
                      { reqSender: userId },
                      { reqReciever: userId }
                  ],
                  status: "accepted"
              });
            return friends;
      }

      getPending = async (userId) => {
            // user will see pending requests it has recieved 
            const user = await UserModel.findById(userId);
            if (!user) {
                  throw new customErrorHandler(400, "user doesnt exist");
            }
            // here the user will be at the recieving end
            const requests = await FriendModel.find({ reqReciever: userId, status: "pending" });
            return requests;
      }

      toggle = async (userId, friendId) => {
            try {
                // Check if the friend exists as a user
                const friendUserExists = await UserModel.findById(friendId);
                if (!friendUserExists) {
                    throw new customErrorHandler(400, "The user to be made a friend does not exist");
                }
        
                // Check if there is an existing friendship or a pending request in either direction
                const existingRelationship = await FriendModel.findOne({
                    $or: [
                        { reqSender: userId, reqReciever: friendId },
                        { reqSender: friendId, reqReciever: userId }
                    ]
                });
                  // relation found
                  if (existingRelationship) {
                        if (existingRelationship.status === 'accepted') {
                              // Remove the friend if already friends
                              await FriendModel.findByIdAndDelete(existingRelationship._id);
                              // update the friends array is user schema
                              await UserModel.findByIdAndUpdate(userId, { $pull: { friends: existingRelationship._id } });
                              await UserModel.findByIdAndUpdate(friendId, { $pull: { friends: existingRelationship._id } });
        
                              return { result: "Friend removed", msg: existingRelationship };
                        } else if (existingRelationship.status === 'pending') {
                              throw new customErrorHandler(400, "Friend request already sent");
                        }
                  } else {
                        // no relation among the users so send request
                        // Send a new friend request
                        const newFriend = new FriendModel({
                              reqSender: userId,
                              reqReciever: friendId,
                              status: "pending"
                        });
        
                        const friendToAdd = await newFriend.save();
                        return { result: "Friend request sent", msg: friendToAdd };
                  }
            } catch (error) {
                throw error;
            }
        };
        

      respond = async (userId, friendId, option) => {
            // check if friend exists as a user or not
            const friendUserExists = await UserModel.findById(friendId);

            if (!friendUserExists) {
                  throw new customErrorHandler(400, "given user to be made friend doesnt exist");
            }

            //check if that user has sent any request
            const request = await FriendModel.findOne({ reqSender: friendId, reqReciever: userId, status: "pending" });

            if (!request) {
                  throw new customErrorHandler(400, "either the user is already a friend or it has not sent any request");
            }

            if (option === "accept") { // accept the request by updating status
                  await FriendModel.findByIdAndUpdate(request._id, { status: "accepted" });
                  // add the request details in user's friends array
                  await UserModel.findByIdAndUpdate(userId, { $push: { friends: request._id } });
                  await UserModel.findByIdAndUpdate(friendId, { $push: { friends: request._id } });

                  return { msg: "request accepted" };
            } else { // reject the request
                  await FriendModel.findByIdAndDelete(request._id);
                  return { msg: "request rejected" };
            }
                  
            
      };
};