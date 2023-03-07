import { Router } from "express";
import passport from "../middlewares/Passport.js";

const router = Router();

import { globalChat, personalChat } from "../controllers/mensajesController.js";

router.get(
  "/chat",
  passport.authenticate("jwt", { session: false }),
  globalChat
);
router.get(
  "/chat/:email",
  passport.authenticate("jwt", { session: false }),
  personalChat
);

export default router;
