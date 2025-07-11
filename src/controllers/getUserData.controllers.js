import { Comment } from "../models/comments.models.js";
import { Follower } from "../models/followers.models.js";
import { Like } from "../models/likes.models.js";
import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js";

const searchUser = async (req, res) => {
  const { userName } = req.params;
  if (!userName) return res.status(403).json({ message: "enter user name" });
  try {
    const user = await User.findOne({ username: userName }, { password: 0 });

    if (!user) return res.status(404).json({ message: "user not found" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 });
    if (user.length === 0)
      return res.status(404).json({ message: "no users found" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};


const getPostsByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: "User ID is required" });

  try {
    const posts = await Post.find({ user_id: userId })
      .sort({ createdAt: -1 })
      .populate("user_id", "username");

    if (!posts.length) return res.status(404).json({ message: "No posts found for this user" });

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};


const getPostById = async (req, res) => {
  const { postId } = req.params;

  if (!postId) return res.status(403).json({ message: "enter post id" });
  try {
    const post = await Post.findById(postId).populate("user_id", "username");

    if (!post) return res.status(404).json({ message: "post not found" });

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const post = await Post.find().populate("user_id", "username");
    if (post.length === 0)
      return res.status(404).json({ message: "no post found" });

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

const getAllLikes = async (req, res) => {
  try {
    const likes = await Like.find().populate("user_id", "username");
    if (likes.length === 0)
      return res.status(404).json({ message: "no likes found" });

    return res.status(200).json({ likes });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

const getLikesById = async (req, res) => {
  const { likeId } = req.params;

  if (!likeId) return res.status(403).json({ message: "enter like id" });
  try {
    const likes = await Like.findById(likeId).populate("user_id", "username");

    if (!likes)
      return res.status(404).json({ message: "liked post not found" });

    return res.status(200).json({ likes });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
const getAllFollower = async (req, res) => {
  try {
    const followers = await Follower.find()
      .populate("follower_id", "username")
      .populate("followed_id", "username");
    if (followers.length === 0)
      return res.status(404).json({ message: "no followers found" });

    return res.status(200).json({ followers });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

const getFollowerById = async (req, res) => {
  const { followerId } = req.params;

  if (!followerId)
    return res.status(403).json({ message: "enter follower id" });
  try {
    const follower = await Follower.findById(followerId)
      .populate("follower_id", "username")
      .populate("followed_id", "username");

    if (!follower)
      return res.status(404).json({ message: "follower not found" });

    return res.status(200).json({ follower });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find().populate("user_id", "username");
    if (comments.length === 0)
      return res.status(404).json({ message: "no comment found" });

    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

const getCommentById = async (req, res) => {
  const { commentId } = req.params;

  if (!commentId) return res.status(403).json({ message: "enter comment id" });
  try {
    const comment = await Comment.findById(commentId).populate(
      "user_id",
      "username"
    );

    if (!comment) return res.status(404).json({ message: "comment not found" });

    return res.status(200).json({ comment });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
export {
  searchUser,
  getAllUser,
  getPostsByUserId,
  getPostById,
  getAllPost,
  getLikesById,
  getAllLikes,
  getAllFollower,
  getFollowerById,
  getAllComment,
  getCommentById,
};
