import pool from "../db/pool.js";
import { badRequestError } from "../helpers/index.js";

export const uploadHeroImage = async (req, res) => {
  const heroId = parseInt(req.params.heroId, 10);

  if (!req.file) {
    throw badRequestError("File not sent");
  }

  const filepath = `/uploads/${req.file.filename}`;

  await pool.query("INSERT INTO images (hero_id, filepath) VALUES ($1, $2)", [
    heroId,
    filepath,
  ]);

  res.status(201).json({ message: "Image uploaded", filepath });
};
