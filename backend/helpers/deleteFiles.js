import fs from "fs";
import path from "path";

export function deleteFiles(filepaths) {
  for (const filepath of filepaths) {
    const fullPath = path.join(process.cwd(), filepath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
}
