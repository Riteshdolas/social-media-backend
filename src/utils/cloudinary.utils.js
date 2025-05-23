import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // supports image, video, etc.
    });
    return {
      url: result.secure_url,
      resource_type: result.resource_type,
    };
  } catch (error) {
    throw error;
  }
};

export { cloudinary, uploadToCloudinary };
