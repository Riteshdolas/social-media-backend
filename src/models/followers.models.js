import mongoose, { Schema } from "mongoose";

const followerSchema = new mongoose.Schema(
  {
    follower_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followed_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

followerSchema.index({ follower_id: 1, followed_id: 1 }, { unique: true });

export const Follower = mongoose.model("Follower", followerSchema);
