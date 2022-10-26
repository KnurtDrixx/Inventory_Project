import * as express from "express";
import apiRouter from "./api";
import authRouter from "./auth";
import uploadsRouter from "./uploads";

const router = express.Router();

router.use("/api", apiRouter);
router.use("/auth", authRouter);
router.use("/uploads", uploadsRouter);

export default router;
