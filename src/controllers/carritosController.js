// CARRITOS CONTROLLER
import ContenedorCarritosDao from "../persistence/DAOs/Carrito.dao.js";
import ContenedorUsuarioDao from "../persistence/DAOs/User.dao.js";
import ContenedorOrdenesDao from "../persistence/DAOs/Ordenes.dao.js";
import { errorFound } from "../middlewares/LoggerPino.js";
import { enviarEmailCompra } from "../middlewares/Nodemailer.js";
const contenedorCarritosDao = new ContenedorCarritosDao();
const contenedorUsuarioDao = new ContenedorUsuarioDao();
const contenedorOrdenesDao = new ContenedorOrdenesDao();

// Crear carrito
export async function crearCarrito(req, res) {
  const carritoCreado = await contenedorCarritosDao.crearCarrito();
  await contenedorUsuarioDao.actualizarUsuario(
    req.cookies.userLoggedEmail,
    carritoCreado
  );
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
    errorFound(response);
  } else if (!carrito.productos.length) {
    response = { error: "Este carrito no tiene productos." };
    errorFound(response);
  } else {
    response = carrito;
  }
  res.json(response);
}

// Ingresar productos por ID al carrito por su ID
export async function guardarProductoEnCarrito(req, res) {
  await contenedorCarritosDao.guardarProductoEnCarrito(
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
  res.json(`Carrito ID: ${req.params.id} eliminado correctamente.`);
}

// Compra orden carrito
export async function comprarOrdenCarrito(req, res) {
  const user = await contenedorUsuarioDao.buscarUsuarioPorEmail(
    req.cookies.userLoggedEmail
  );
  const carrito = await contenedorCarritosDao.obtenerCarritoPorId(user.carrito);
  const orden = {
    productos: carrito.productos,
    estado: "Generada",
    email: user.email,
  };
  const ordenGenerada = await contenedorOrdenesDao.generarOrden(orden);
  enviarEmailCompra(ordenGenerada);
  res.render("compra", { user, ordenGenerada });
}
