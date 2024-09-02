import mongoose from "mongoose";

export const friendSchema = new mongoose.Schema({
    reqSender: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reqReciever: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


