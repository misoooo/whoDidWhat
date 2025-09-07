import express from "express";
import { generateToken, verifyToken } from "../controllers/auth.js";
const router = express.Router();

router.post("/generateToken", generateToken);
router.get("/verifyToken", verifyToken);

export default router;