import { Post } from "../models/post.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

const createPost = async (req, res) => {
  const { user_id, caption } = req.body;
  try {
    let post_url = null;
    let media_type = null;

    if (req.file) {
      const { url, resource_type } = await uploadToCloudinary(req.file.path);

      post_url = url;
      media_type = resource_type;
    }

    const post = new Post({ user_id, caption, post_url, media_type });
    const savedPost = await post.save();

    return res.status(201).json({ savedPost, message: "post created" });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export { createPost };
