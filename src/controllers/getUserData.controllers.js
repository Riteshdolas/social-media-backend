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
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 });

    if (!user) return res.status(404).json({ message: "user not found" });

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

const getPostById = async (req, res) => {
  const { postId } = req.params;
  console.log("postid: ", postId);

  if (!postId) return res.status(403).json({ message: "enter post id" });
  try {
    const post = await Post.findById(postId).populate("user_id", "username");

    if (!post) return res.status(404).json({ message: "post not found" });

    return res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const post = await Post.find().populate("user_id", "username");

    if (!post) return res.status(404).json({ message: "post not found" });

    return res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
export { searchUser, getAllUser, getPostById, getAllPost };
