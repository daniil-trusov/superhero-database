import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/index.js";
import { createUploadsDir, uploadsPath } from "./helpers/index.js";
import { heroesRouter } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

createUploadsDir();
app.use("/uploads", express.static(uploadsPath));

app.use("/heroes", heroesRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
