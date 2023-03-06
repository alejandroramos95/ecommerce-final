import { Router } from "express";

const router = Router();

import { globalChat, personalChat } from "../controllers/mensajesController.js";

router.get("/chat", globalChat);
router.get("/chat/:email", personalChat);

export default router;
