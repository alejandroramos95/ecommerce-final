import session from "express-session";
import MongoStore from "connect-mongo";
import bCrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const mongoURL = process.env.MONGODB;

export function createOnMongoStore() {
  const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  return session({
    store: MongoStore.create({
      mongoUrl: mongoURL,
      mongoOptions: advancedOptions,
      ttl: 60,
      collectionName: "sessions",
    }),
    secret: "sh21501295asdjk",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 100000 },
  });
}

export function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

export function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}
