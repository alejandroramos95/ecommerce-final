import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy } from "passport-jwt";
import { isValidPassword } from "../services/userService.js";
import dotenv from "dotenv";
dotenv.config();

import ContenedorUsuarioDao from "../persistence/DAOs/User.dao.js";
const contenedorUsuarioDao = new ContenedorUsuarioDao();

const JWTKEY = process.env.JWTKEY;

const jwtOptions = {
  secretOrKey: JWTKEY,
  jwtFromRequest: (req) => req.cookies.userLoggedToken,
};

// JWT STRATEGY

passport.use(
  "jwt",
  new JWTStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = contenedorUsuarioDao.buscarUsuarioPorEmail(payload.email);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      console.log("error en JWTStrategy: ", e);
      return done(e, false);
    }
  })
);

// LOGIN STRATEGY
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "emailUser",
      passwordField: "passwordUser",
      passReqToCallback: true,
    },
    async (req, emailUser, passwordUser, done) => {
      const usuario = await contenedorUsuarioDao.buscarUsuarioPorEmail(
        emailUser
      );
      if (!usuario) return done(null, false);
      if (!isValidPassword(usuario, passwordUser)) return done(null, false);
      return done(null, usuario);
    }
  )
);

// Serialize
passport.serializeUser((user, done) => {
  done(null, user.email);
});

// Deserialize
passport.deserializeUser(async (email, done) => {
  const user = await contenedorUsuarioDao.buscarUsuarioPorEmail(email);
  done(null, user);
});

export default passport;
