// USER CONTROLLER ## LOGIN, REGISTER, SESSION RELATED WITH USER DATA
import express from "express";
import ContenedorUsuarioDao from "../persistence/DAOs/User.dao.js";
const contenedorUsuarioDao = new ContenedorUsuarioDao();
import { createHash } from "../services/userService.js";

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
    name: req.body.emailUser,
    rol: "administridor",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };
  const token = jwt.sign(payload, process.env.JWT_SIGN);
  res.json({ token });
}

export async function userRegister(req, res) {
  console.log("register REQ", req);
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
    res.render("login");
  } else {
    res.render("register-error");
  }
}

// ELIMINAR SESSION
export function destrySession(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
  });
  res.render("login");
}

// GET PERFIL DATA
export async function getUserData(req, res) {
  const profileData = await sessionService.buscarUsuarioPorEmail(
    req.cookies.userEmail
  );
  if (profileData) {
    res.render("perfil", { profileData });
  } else {
    res.render("login");
  }
}
