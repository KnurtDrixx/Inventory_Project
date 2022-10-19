import * as express from "express";
import apiRouter from "./api";
import uploadsRouter from "./uploads";

const router = express.Router();

router.use("/api", apiRouter);
router.use("/uploads", uploadsRouter);

export default router;
