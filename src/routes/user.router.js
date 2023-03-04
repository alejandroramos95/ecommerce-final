import { Router } from "express";
import {
  renderLogin,
  renderRegister,
  userRegister,
  loginError,
  registerError,
  jsonWebTokenAuth,
  destroySession,
  getUserInfo,
  setUserEmailCookieFromSession,
} from "../controllers/userController.js";
import passport from "../middlewares/Passport.js";
import upload from "../middlewares/multer.js";

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
  setUserEmailCookieFromSession,
  jsonWebTokenAuth
);

// LOG OUT
router.get("/logout", destroySession);

// USER INFO
router.get("/user-info", getUserInfo);

export default router;
