import express, { Router } from "express";
import {
  addComment,
  addFollower,
  likePost,
  login,
  profile,
  registerUser,
  sendMessage,
} from "../controllers/user.controllers.js";
import { authMiddleware, optionalAuthMiddleware } from "../middlewares/token.middleware.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { createPost } from "../controllers/post.controllers.js";
import {
  updateComment,
  updatePost,
  updateRegisterUser,
} from "../controllers/updateUser.controllers.js";
import {
  deletePost,
  removeComment,
  removeLike,
  unFollow,
} from "../controllers/delete.user.controller.js";
import {
  getAllComment,
  getAllFollower,
  getAllLikes,
  getAllPost,
  getAllUser,
  getCommentById,
  getFollowerById,
  getLikesById,
  getMessages,
  getPostById,
  getPostsByUserId,
  searchUser,
} from "../controllers/getUserData.controllers.js";
import { addStory } from "../controllers/story.controllers.js";

const router = Router();

router.post("/register", upload.single("profile"), registerUser);
router.post("/login", login);
router.post("/post", authMiddleware, upload.single("post"), createPost);
router.post("/like", authMiddleware, likePost);
router.post("/follower", authMiddleware, addFollower);
router.post("/message", authMiddleware, sendMessage);
router.post("/comment", authMiddleware, addComment);
router.post("/story", authMiddleware, upload.single("file"), addStory);

router.put("/register/:userId", authMiddleware, upload.single("profile"), updateRegisterUser);
router.put("/post/:postId", authMiddleware, upload.single("post"), updatePost);
router.put("/comment/:commentId", authMiddleware, updateComment);

router.delete("/post/:postId", authMiddleware, deletePost);
router.delete("/follower/:followedId", authMiddleware, unFollow);
router.delete("/like/:likeId", authMiddleware, removeLike);
router.delete("/comment/:commentId", authMiddleware, removeComment);

router.get("/all", authMiddleware, getAllUser);
router.get("/profile", authMiddleware, profile);
router.get("/:userName", authMiddleware, searchUser);
router.get("/all/post", optionalAuthMiddleware, getAllPost);
router.get("/post/:userId", getPostsByUserId);
router.get("/postid/:postId", getPostById);
router.get("/all/like", authMiddleware, getAllLikes);
router.get("/like/:likeId", getLikesById);
router.get("/all/follower", authMiddleware, getAllFollower);
router.get("/follower/:followerId", getFollowerById);
router.get("/all/comment", authMiddleware, getAllComment);
router.get("/comment/:commentId", getCommentById);
router.get("/message/:sender_id/:receiver_id", authMiddleware, getMessages);

export default router;
