// USER CONTROLLER ## LOGIN, REGISTER, SESSION RELATED WITH USER DATA
import express from "express";
import ContenedorUsuarioDao from "../persistence/DAOs/User.dao.js";
const contenedorUsuarioDao = new ContenedorUsuarioDao();

import { createHash } from "../services/userService.js";
import { enviarEmailRegistro } from "../middlewares/Nodemailer.js";

export function renderLogin(req, res) {
  res.render("login");
}

export function renderRegister(req, res) {
  res.render("register");
}

export async function loginError(req, res) {
  res.render("login-error");
}

export async function registerError(req, res) {
  res.render("register-error");
}

export function jsonWebTokenAuth(req, res) {
  const payload = {
    name: req.session.passport.user,
    rol: "administrador",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };
  console.log(payload);
  const token = jwt.sign(payload, process.env.JWT_SIGN);
  res.json({ token });
}

export function setUserEmailCookieFromSession(req, res) {
  res.cookie("userLoggedEmail", req.session.passport.user);
  res.redirect("/productos");
}

export async function userRegister(req, res) {
  const registerData = {
    email: req.body.registerEmail,
    password: createHash(req.body.registerPassword),
    nombre: req.body.registerNombre,
    direccion: req.body.registerDireccion,
    edad: req.body.registerEdad,
    contacto: req.body.phone,
    avatar: req.file.path,
    carrito: "",
  };
  const response = await contenedorUsuarioDao.registrarUsuario(registerData);
  if (response) {
    enviarEmailRegistro(registerData);
    res.render("login");
  } else {
    res.render("register-error");
  }
}

// ELIMINAR SESSION
export function destroySession(req, res) {
  res.clearCookie("userLoggedEmail");
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
  });
  res.render("login");
}

// GET PERFIL DATA
export async function getUserInfo(req, res) {
  try {
    if (req.session.passport) {
      const userInfo = await contenedorUsuarioDao.getUserInfoForPublic(
        req.session.passport.user
      );
      res.render("user-info", { userInfo });
    } else {
      res.render("login");
    }
  } catch (e) {
    console.log("error perfil usuario: ", e);
  }
}
