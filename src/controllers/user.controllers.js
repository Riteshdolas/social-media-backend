import { Follower } from "../models/followers.models.js";
import { Like } from "../models/likes.models.js";
import { Message } from "../models/message.models.js";
import { User } from "../models/user.models.js";
import { Comment } from "../models/comments.models.js";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

const generateToken = (userData) => {
  try {
    return jwt.sign({ ...userData }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10d",
    });
  } catch (error) {
    return res.status.json({ error: "error not found" });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, bio, media_type } = req.body;
  try {
    let profilePicture = null;
    let media_type = null;

    if (!req.file)
      return res.status(400).json({ message: "Profile picture is required" });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const { url, resource_type } = await uploadToCloudinary(req.file.path);
    profilePicture = url;
    media_type = resource_type;

    const user = new User({
      username,
      email,
      password,
      bio,
      profilePicture,
      media_type,
    });
    const savedUser = await user.save();

    const payload = {
      id: savedUser._id.toString(),
      username: savedUser.username,
    };

    const token = generateToken(payload);

    return res.status(200).json({ savedUser, token });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const addFollower = async (req, res) => {
  const { follower_id, followed_id } = req.body;

  if (!follower_id || !followed_id) {
    return res
      .status(400)
      .json({ message: "follower or followed id missing!" });
  }

  try {
    const alradyFollower = await Follower.findOne({ follower_id, followed_id });

    if (alradyFollower) {
      return res.status(400).json({ message: "alrady following" });
    }

    const follower = new Follower({ follower_id, followed_id });
    const savedFollower = await follower.save();

    return res.status(200).json(savedFollower);
  } catch (error) {
    return res.status(500).json({ error: "follower not found" });
  }
};

const likePost = async (req, res) => {
  const { post_id } = req.body;

  if (!req.user?.id || !post_id) {
    return res.status(400).json({ message: "user or post id missing!" });
  }

  try {
    const user_id = req.user.id;
    const alreadyLiked = await Like.findOne({ user_id, post_id });

    if (alreadyLiked) {
      const likesCount = await Like.countDocuments({ post_id });

      return res.status(200).json({
        message: "Already liked",
        _id: alreadyLiked._id,
        likesCount,
        userHasLiked: true,
      });
    }

    const newLike = new Like({ user_id, post_id });
    await newLike.save();

    const likesCount = await Like.countDocuments({ post_id });

    return res.status(200).json({
      message: "Post liked successfully",
      likesCount,
      _id: newLike._id,
      userHasLiked: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to like post" });
  }
};

const sendMessage = async (req, res) => {
  const { text, sender_id, receiver_id, isRead } = req.body;

  if (!sender_id || !receiver_id) {
    return res.status(400).json({ message: "sender or receiver id missing!" });
  }

  try {
    const message = new Message({ text, sender_id, receiver_id, isRead });
    const savedmessage = await message.save();

    return res.status(200).json(savedmessage);
  } catch (error) {
    return res.status(500).json({ error: "message was not sent" });
  }
};

// const addComment = async (req, res) => {
//   const { user_id, post_id, text } = req.body;

//   try {
//     if (!user_id || !post_id || !text)
//       return res.status(400).json({ message: "required all the fields" });

//     const comment = new Comment(req.body);
//     const savedComment = await comment.save();

//     return res.status(200).json(savedComment);
//   } catch (error) {
//     return res.status(500).json({ error: "commnt error" });
//   }
// };

const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const comment = new Comment({
      text,
      post_id: postId,
      user_id: userId,
    });

    await comment.save();

    res.status(201).json({ message: "Comment added", text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while adding comment" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = generateToken(payload);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: "inernal server error" });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  registerUser,
  addFollower,
  likePost,
  sendMessage,
  generateToken,
  login,
  // addComment,
  profile,
  createComment,
};
