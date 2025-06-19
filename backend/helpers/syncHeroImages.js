import pool from "../db/pool.js";
import { deleteFiles } from "./deleteFiles.js";

export async function syncHeroImages(heroId, incomingImages, newFiles) {
  const { rows: existingImages } = await pool.query(
    "SELECT filepath FROM images WHERE hero_id = $1",
    [heroId]
  );

  const imagesToDelete = existingImages
    .map((img) => img.filepath)
    .filter((filepath) => !incomingImages.includes(filepath));

  deleteFiles(imagesToDelete);

  if (imagesToDelete.length > 0) {
    await pool.query(
      "DELETE FROM images WHERE hero_id = $1 AND filepath = ANY($2::text[])",
      [heroId, imagesToDelete]
    );
  }

  if (newFiles && newFiles.length > 0) {
    const imageInsertPromises = newFiles.map((file) => {
      const filepath = `/uploads/${file.filename}`;
      return pool.query(
        "INSERT INTO images (hero_id, filepath) VALUES ($1, $2)",
        [heroId, filepath]
      );
    });
    await Promise.all(imageInsertPromises);
  }
}
