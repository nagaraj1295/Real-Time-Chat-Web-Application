import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage, markMessagesAsRead, cleanupUsers } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);
router.post("/read/:id", protectRoute, markMessagesAsRead);

// Temporary cleanup route - will remove after use
router.get("/admin/cleanup", cleanupUsers);

export default router;
