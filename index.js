import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./src/features/user/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import friendRouter from "./src/features/friendship/friends.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.middleware.js";

const server = express();

server.use(express.json());
server.use(cookieParser());

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/comments', commentRouter);
server.use('/api/likes', likeRouter);
server.use('/api/friends',friendRouter);
server.use('/api/otp',otpRouter);

server.use(errorHandlerMiddleware);

server.use((req, res) => { // for invalid urls, so placed at last
      res
        .status(404)
        .json({ success: false, msg: `Invalid path: ${req.originalUrl}` });
    });

export default server;