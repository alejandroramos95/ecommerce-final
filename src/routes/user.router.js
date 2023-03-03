import { Router } from "express";
import {
  renderLogin,
  renderRegister,
  userRegister,
  loginError,
  registerError,
  jsonWebTokenAuth,
} from "../controllers/userController.js";
import passport from "../controllers/middlewares/Passport.js";
import upload from "../controllers/middlewares/multer.js";

const router = Router();

// LOGIN
router.get("/", renderLogin);
router.get("/login-error", loginError);
router.post(
  "/user/login",
  passport.authenticate("login", {
    successRedirect: "/productos",
    failureRedirect: "/login-error",
    passReqToCallback: true,
  }),
  jsonWebTokenAuth
);
// REGISTER
router.get("/register", renderRegister);
router.get("/register-error", registerError);
router.post("/user/register", upload.single("image"), userRegister);

export default router;
