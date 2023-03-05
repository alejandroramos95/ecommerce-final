import { Router } from "express";
import passport from "../middlewares/Passport.js";

//import funciones

const router = Router();

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
