import { Router } from "express";
import {
  renderLogin,
  renderRegister,
  userRegister,
  loginError,
  registerError,
  generateJWToken,
  destroySession,
  getUserInfo,
} from "../controllers/userController.js";
import passport from "../middlewares/Passport.js";
import upload from "../middlewares/Multer.js";

const router = Router();

// REGISTER
router.get("/register", renderRegister);
router.get("/register-error", registerError);
router.post("/user/register", upload.single("image"), userRegister);

// LOGIN
router.get("/", renderLogin);
router.get("/login-error", loginError);
router.post(
  "/user/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
    passReqToCallback: true,
  }),
  generateJWToken
);

// LOG OUT
router.get("/logout", destroySession);

// USER INFO
router.get(
  "/user-info",
  passport.authenticate("jwt", { session: false }),
  getUserInfo
);

export default router;
