import pool from "../db/pool.js";
import {
  deleteFiles,
  notFoundError,
  syncHeroImages,
  validateHeroData,
} from "../helpers/index.js";

export async function getHeroes(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  const { rows: heroes } = await pool.query(
    `SELECT h.id, h.nickname, i.filepath AS preview_image
   FROM heroes h
   LEFT JOIN LATERAL (
     SELECT filepath
     FROM images
     WHERE hero_id = h.id
     ORDER BY id ASC
     LIMIT 1
   ) i ON true
   ORDER BY h.id
   LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const { rows: countRows } = await pool.query("SELECT COUNT(*) FROM heroes");

  const totalCount = parseInt(countRows[0].count, 10);

  res.json({ heroes, totalCount });
}

export async function getHeroById(req, res) {
  const id = req.params.id;
  const { rows } = await pool.query("SELECT * FROM heroes WHERE id = $1", [id]);

  if (!rows.length) {
    throw notFoundError(`Hero with id ${id} not found`);
  }

  const hero = rows[0];

  const { rows: images } = await pool.query(
    "SELECT filepath FROM images WHERE hero_id = $1",
    [id]
  );

  hero.images = images.map((img) => img.filepath);

  res.json(hero);
}

export async function createHero(req, res) {
  const data = req.body;

  validateHeroData(data);

  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    data;

  const { rows } = await pool.query(
    `INSERT INTO heroes 
     (nickname, real_name, origin_description, superpowers, catch_phrase)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nickname, real_name, origin_description, superpowers, catch_phrase]
  );

  const hero = rows[0];
  const heroId = hero.id;

  if (req.files?.length) {
    const imageInsertPromises = req.files.map((file) => {
      const filepath = `/uploads/${file.filename}`;
      return pool.query(
        "INSERT INTO images (hero_id, filepath) VALUES ($1, $2)",
        [heroId, filepath]
      );
    });

    await Promise.all(imageInsertPromises);
  }

  res.status(201).json(hero);
}

export async function updateHero(req, res) {
  const id = req.params.id;
  const data = req.body;

  validateHeroData(data);

  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images: incomingImages = [],
  } = data;

  const { rows } = await pool.query(
    `UPDATE heroes SET 
       nickname = $1,
       real_name = $2,
       origin_description = $3,
       superpowers = $4,
       catch_phrase = $5
     WHERE id = $6 RETURNING *`,
    [nickname, real_name, origin_description, superpowers, catch_phrase, id]
  );

  if (!rows.length) {
    throw notFoundError(`Hero with id ${id} not found`);
  }

  await syncHeroImages(id, incomingImages, req.files);

  res.status(200).json(rows[0]);
}

export async function deleteHero(req, res) {
  const id = req.params.id;

  const { rows: images } = await pool.query(
    "SELECT filepath FROM images WHERE hero_id = $1",
    [id]
  );

  deleteFiles(images.map((img) => img.filepath));

  const { rowCount } = await pool.query("DELETE FROM heroes WHERE id = $1", [
    id,
  ]);

  if (!rowCount) {
    throw notFoundError(`Hero with id ${id} not found`);
  }

  res.status(200).json({ message: `Hero with id ${id} deleted successfully` });
}
