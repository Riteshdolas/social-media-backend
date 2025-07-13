import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js";
import { Comment } from "../models/comments.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

const updateRegisterUser = async (req, res) => {
  const userId = req.params.userId;
  const { username, email, password, bio, profilePicture } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) return res.status(400).json({ message: "user not found" });
    const updateData = {
      username,
      bio,
      email,
      profilePicture,
    };
    if (password) {
      const isPassword = await user.comparePassword(password);
      if (isPassword)
        return res
          .status(400)
          .json({ message: "entered same password as the old password" });
      updateData.password = password;
    }

    if (req.file) {
      const { url, resource_type } = await uploadToCloudinary(req.file.path);
      updateData.profilePicture = url;
      updateData.media_type = resource_type;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(200).json({ updatedUser, message: "user updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "unable to update" });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const { caption } = req.body;
  try {
    if (!caption) return res.status(400).json({ message: "caption required" });

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user_id.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { caption },
      { new: true }
    );
    res.status(200).json({ updatedPost, message: "post updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "unable to update post" });
  }
};

const updateComment = async (req, res) => {
  const commentId = req.params.commentId;
  const { text } = req.body;
  try {
    if (!text) return res.status(400).json({ message: "comment required" });

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );
    res
      .status(200)
      .json({ updatedComment, message: "comment updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "unable to update comment" });
  }
};

export { updateRegisterUser, updatePost, updateComment };
