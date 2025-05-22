import { Comment } from "../models/comments.models.js";
import { Follower } from "../models/followers.models.js";
import { Like } from "../models/likes.models.js";
import { Post } from "../models/post.models.js";

const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(400).json({ message: "post not found" });

    if (post.user_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "unauthorized" });
    }

    const deletedpost = await Post.findByIdAndDelete(postId);
    return res
      .status(200)
      .json({ deletedpost, message: "post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "unable to delete post" });
  }
};

const unFollow = async (req, res) => {
  const { followedId } = req.params;

  if (!followedId) return res.status(400).json({ message: "Enter Id" });
  try {
    const follower = await Follower.findById(followedId);

    if (!follower) return res.status(400).json({ message: "user not found" });

    if (follower.follower_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "unauthorized" });
    }

    const unfollow = await Follower.findByIdAndDelete(followedId);
    return res.status(200).json({ unFollow, message: "unFollowed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "unable to unfollow" });
  }
};

const removeLike = async (req, res) => {
  const { likeId } = req.params;

  if (!likeId) return res.status(400).json({ message: "Enter Id" });
  try {
    const like = await Like.findById(likeId);

    if (!like) return res.status(400).json({ message: "user not found" });

    if (like.user_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "unauthorized" });
    }

    const removedlike = await Like.findByIdAndDelete(likeId);
    return res.status(200).json({ removeLike, message: "Like revomed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "unable to revomed Like" });
  }
};

const removeComment = async (req, res) => {
  const { commentId } = req.params;

  if (!commentId) return res.status(400).json({ message: "Enter Id" });
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(400).json({ message: "user not found" });

    if (comment.user_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "unauthorized" });
    }

    const removedcomment = await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ removedcomment, message: "comment removed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "unable to remove commnet" });
  }
};

export { deletePost, unFollow, removeLike, removeComment };
