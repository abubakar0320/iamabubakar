import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadFile = async (fileStr: string, folder: string, resourceType: "image" | "raw" | "auto" = "auto") => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: `portfolio/${folder}`,
      resource_type: resourceType,
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// Keeping uploadImage for backward compatibility but using the generic one internally
export const uploadImage = (fileStr: string, folder: string) => uploadFile(fileStr, folder, "image");

export const deleteFile = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};
