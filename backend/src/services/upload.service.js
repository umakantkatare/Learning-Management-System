import crypto from "crypto";
import streamifier from "streamifier";
import ApiError from "../utils/error.util.js";
import cloudinary from "../configs/cloudnary.config.js";

/**
 * Upload Image
 */
export const uploadImageService = async (file, folder = "lms/images") => {
  if (!file) {
    throw new ApiError("Image file is required", 400);
  }

  return await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(new ApiError("Image upload failed", 500));
        }

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
        });
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

/**
 * Sign Video Upload
 * Frontend uploads directly
 */
export const signVideoUploadService = async (folder = "lms/course/videos") => {
  const timestamp = Math.round(Date.now() / 1000);

  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
  console.log('upload-video service:', paramsToSign);

  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign)
    .digest("hex");

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder,
    timestamp,
    signature,
  };
};

/**
 * Delete File
 */
export const deleteFileService = async (publicId) => {
  if (!publicId) {
    throw new ApiError("publicId required", 400);
  }

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "auto",
  });

  return result;
};
