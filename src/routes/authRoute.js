import express from "express";
const router = express.Router();
router.post("/login", (req, res) => res.status(501).json({ message: "Not Implemented" }));
router.post("/signup", (req, res) => res.status(501).json({ message: "Not Implemented" }));
export default router;
