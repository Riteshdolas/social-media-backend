import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    caption: {
        type: String,
        required: true,
        trim: true
    },
   post_url: {
        type: String,
        trim: true,
        required: true,
    },
    media_type: {
        type: String,
        enum: ['image', 'video'],
        required: true,
    },

}, {timestamps: true})

export const Post = mongoose.model("Post", postSchema)