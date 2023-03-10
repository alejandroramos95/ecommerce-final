// PRODUCTOS CONTROLLER
import ContenedorProductosDao from "../persistence/DAOs/Producto.dao.js";
import { errorFound } from "../middlewares/LoggerPino.js";
const contenedorProductosDao = new ContenedorProductosDao();

export async function leerProductos(req, res) {
  const listaProductos = await contenedorProductosDao.leerProductos();
  let response;
  if (listaProductos.length) {
    response = listaProductos;
  } else {
    response = { error: "No existen productos cargados." };
    errorFound(response);
  }
  res.json(response);
}

export async function listarPorId(req, res) {
  const productoBuscado = await contenedorProductosDao.listarPorId(
    req.params.id
  );
  let response;
  if (productoBuscado) {
    response = productoBuscado;
  } else {
    response = { error: "No existe el producto." };
    errorFound(response);
  }
  res.json(response);
}

export async function listarPorCategoria(req, res) {
  const categBuscada = await contenedorProductosDao.listarPorCategoria(
    req.params.categoria
  );
  let response;
  if (categBuscada) {
    response = categBuscada;
  } else {
    response = { error: "No existe la categoria." };
    errorFound(response);
  }
  res.json(response);
}

// Producto ejemplo para Postman
/*
{
    "Nombre": "Jugo",
    "Categoria": "Liquido",
    "Codigo": "11111",
    "Link-Foto": "https://assets.stickpng.com/images/580b585b2edbce24c47b2780.png",
    "Precio": "100",
    "Stock": "999"
}
*/
export async function guardoProductoEnDB(req, res) {
  const response = await contenedorProductosDao.guardoProductoEnDB(req.body);
  res.json(response);
}

// Actualizar producto de la lista por ID con permisos Admin
export async function actualizarProducto(req, res) {
  contenedorProductosDao.actualizarProducto(req.body, req.params.id);
  res.status(200).json("Objeto actualizado");
}

// Eliminar producto de la lista por ID con permisos Admin
export async function borrarProducto(req, res) {
  const productoBorrado = await contenedorProductosDao.borrarProducto(
    req.params.id
  );
  res
    .status(200)
    .json(
      `El objeto con ID: ${req.params.id} fue eliminado de la lista de productos.`
    );
}
