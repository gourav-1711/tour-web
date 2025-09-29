import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function getPublicIdFromUrl(url) {
  // Remove query params if any
  url = url.split("?")[0];

  // Extract part after /upload/
  const parts = url.split("/upload/");
  if (parts.length < 2) return null;

  // Remove version + extension
  const path = parts[1].split("/"); // ["v1695895583", "folder", "myphoto.jpg"]
  path.shift(); // remove version ("v123...")
  const filename = path.join("/");

  // Drop extension
  return filename.replace(/\.[^/.]+$/, "");
}


export default cloudinary;
