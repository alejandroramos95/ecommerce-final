import { Router } from "express";

const router = Router();

import { globalChat } from "../controllers/mensajesController.js";

router.get("/chat", globalChat);

/* router.get(
  "/chat/:email",
  passport.authenticate("jwt", { session: false }),
  personalChat
); */

export default router;
