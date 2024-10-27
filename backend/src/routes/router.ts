import express from "express";

import authRouter from "./auth";
import dataRouter from "./data";

import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/data", authMiddleware, dataRouter);

router.get("/", (req, res) => {
    res.send("Macro Tracker API")
})

export default router;