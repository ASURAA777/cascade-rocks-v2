import { v2 as cloudinary } from "cloudinary";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

cloudinary.config({
  cloud_name: "domvgpvwp",
  api_key: "174951151654959",
  api_secret: "P88pQ_r_56viTbbnl-NtR8vYWU0",
});

const videoPath = join(__dirname, "public", "media", "enter", "landing-page-video.mp4");

console.log("Uploading video to Cloudinary — this may take 30–60 seconds...");

const result = await cloudinary.uploader.upload(videoPath, {
  resource_type: "video",
  public_id: "cascade-rocks-landing-video",
  overwrite: true,
});

console.log("\n✅ Upload complete!");
console.log("Secure URL:", result.secure_url);
console.log("\nCopy the URL above and paste it into the chat.");
