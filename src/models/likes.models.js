import mongoose, { Schema } from "mongoose";

const likesSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
}, {timestamps: true})

likesSchema.index({ user_id: 1, post_id: 1 }, { unique: true });

export const Like = mongoose.model("Like", likesSchema)