import express from "express";
import { MAX_IMAGES_PER_HERO } from "../config/config.js";
import { asyncHandler, upload } from "../middleware/index.js";
import {
  getHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", asyncHandler(getHeroes));
router.get("/:id", asyncHandler(getHeroById));
router.post(
  "/create",
  upload.array("images", MAX_IMAGES_PER_HERO),
  asyncHandler(createHero)
);
router.put(
  "/:id/edit",
  upload.array("images", MAX_IMAGES_PER_HERO),
  asyncHandler(updateHero)
);
router.delete("/:id", asyncHandler(deleteHero));

export default router;
