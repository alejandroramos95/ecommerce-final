// CARRITOS CONTROLLER

import ContenedorCarritosDao from "../persistence/DAOs/Carrito.dao.js";
const contenedorCarritosDao = new ContenedorCarritosDao();

// Crear carrito
export async function crearCarrito(req, res) {
  const carritoCreado = await contenedorCarritosDao.crearCarrito();
  res.json(carritoCreado);
}

// Listar todos los carritos
export async function leerCarritos(req, res) {
  let response;
  const listaCarritos = await contenedorCarritosDao.leerCarritos();
  if (listaCarritos.length) {
    response = listaCarritos;
  } else {
    response = { error: "No hay carritos cargados." };
  }
  res.json(response);
}

// Listar productos dentro del carrito por ID
export async function obtenerCarritoPorId(req, res) {
  const carrito = await contenedorCarritosDao.obtenerCarritoPorId(
    req.params.id
  );
  let response;
  if (!carrito) {
    response = { error: "No existe el carrito." };
  } else if (!carrito.productos.length) {
    response = { error: "Este carrito no tiene productos." };
  } else {
    response = carrito;
  }
  res.json(response);
}

// Ingresar productos por ID al carrito por su ID
export async function guardarProductoEnCarrito(req, res) {
  const response = await contenedorCarritosDao.guardarProductoEnCarrito(
    req.params.id,
    req.params.idProd
  );
  res.json(
    `Producto ID: ${req.params.idProd} agregado al carrito: ${req.params.id}`
  );
}

// Eliminar un producto del carrito por ID
export async function eliminarProductoDeCarrito(req, res) {
  const response = await contenedorCarritosDao.eliminarProductoDeCarrito(
    req.params.id,
    req.params.idProd
  );
  if (response) {
    res.json(
      `Producto ID: ${req.params.idProd} eliminado del carrito ID: ${req.params.id}`
    );
  } else {
    res.json(`ID del carrito o producto erroneos`);
  }
}

// Eliminar carrito por ID
export async function eliminarCarritoPorId(req, res) {
  const response = await contenedorCarritosDao.eliminarCarritoPorId(
    req.params.id
  );
  console.log(response);
  res.json(`Carrito ID: ${req.params.id} eliminado correctamente.`);
}

// COMPRA CARRITO -- revisar nodemailer cuando se implemente
/* export async function enviarEmailCompra(req, res) {
  const user = await sessionService.buscarUsuarioPorEmail(
    req.cookies.userEmail
  );
  const carrito = await contenedorCarritos.obtenerCarrito(user.carrito);
  enviarEmailCompra(user.email, carrito);
  res.render("compra", { user });
} */
