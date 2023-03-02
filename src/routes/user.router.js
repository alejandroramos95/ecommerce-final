import { Router } from "express";
import {
  renderLogin,
  renderRegister,
  userRegister,
  loginError,
  registerError,
} from "../controllers/userController.js";
import passport from "../controllers/middlewares/passport.js";

const router = Router();

router.get("/", renderLogin);
router.get("/login-error", loginError);
router.post(
  "/user/login",
  passport.authenticate("login", {
    successRedirect: "/productos",
    failureRedirect: "/login-error",
    passReqToCallback: true,
  })
);
router.get("/register", renderRegister);
router.get("/register-error", registerError);
router.post("/user/register", userRegister);

export default router;
