import passport from "passport";
import { Strategy } from "passport-local";
import passportJwt from "passport-jwt";
import { isValidPassword } from "../../services/userService.js";
import dotenv from "dotenv";
dotenv.config();

import ContenedorUsuarioDao from "../../persistence/DAOs/User.dao.js";
const contenedorUsuarioDao = new ContenedorUsuarioDao();

const LocalStrategy = Strategy;

/* const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const JWTKEY = process.env.JWTKEY; */

/* const jwtOptions = {
  secretOrKey: JWTKEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      console.log("Validando JWT");
      const user = contenedorUsuarioDao.buscarUsuarioPorEmail(payload.email);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      console.log(e);
      return done(e, false);
    }
  })
); */

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
