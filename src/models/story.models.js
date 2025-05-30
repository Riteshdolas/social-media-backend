import mongoose, { Schema } from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media_url: {
      type: String,
      trim: true,
      required: true,
    },
    media_type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Story = mongoose.model("Story", storySchema);
