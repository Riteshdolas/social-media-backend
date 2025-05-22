import express, { Router } from "express";
import {
  addComment,
  addFollower,
  likePost,
  login,
  registerUser,
  sendMessage,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/token.middleware.js";
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
  getAllPost,
  getAllUser,
  getPostById,
  searchUser,
} from "../controllers/getUserData.controllers.js";

const router = Router();

router.post("/register", upload.single("profile"), registerUser);
router.post("/login", authMiddleware, login);
router.post("/post", upload.single("post"), createPost);
router.post("/like", likePost);
router.post("/follower", addFollower);
router.post("/message", sendMessage);
router.post("/comment", addComment);

router.put("/register/:userId", upload.single("profile"), updateRegisterUser);
router.put("/post/:postId", authMiddleware, upload.single("post"), updatePost);
router.put("/comment/:commentId", updateComment);

router.delete("/post/:postId", authMiddleware, deletePost);
router.delete("/follower/:followedId", authMiddleware, unFollow);
router.delete("/like/:likeId", authMiddleware, removeLike);
router.delete("/comment/:commentId", authMiddleware, removeComment);

router.get("/all", getAllUser);
router.get("/:userName", searchUser);
router.get("/all/post", getAllPost);
router.get("/post/:postId", getPostById);
export default router;
