import fs from "fs";
import path from "path";

export const uploadsPath = path.resolve("uploads");

export function createUploadsDir() {
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
    console.log("Uploads directory created at:", uploadsPath);
  }
}
