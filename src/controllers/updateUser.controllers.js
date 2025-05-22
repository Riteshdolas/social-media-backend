import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js";
import { Comment } from "../models/comments.models.js";

const updateRegisterUser = async (req, res) => {
  const userId = req.params.userId;
  const { username, email, password, bio, profilePicture } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) return res.status(400).json({ message: "user not found" });
    const isPassword = await user.comparePassword(password)
    if(!password) return res.status(400).json({message: "add a password"})
    if (isPassword)
      return res
        .status(400)
        .json({ message: "entered same password as the old password" });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        password,
        bio,
        email,
        profilePicture,
      },
      { new: true }
    );

    res.status(200).json({ updatedUser, message: "user updated successfully" });
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return res.status(500).json({ error: "unable to update comment" });
  }
};

export { updateRegisterUser, updatePost, updateComment };
