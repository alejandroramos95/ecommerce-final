import { Router } from "express";
import {
  crearCarrito,
  leerCarritos,
  obtenerCarritoPorId,
  guardarProductoEnCarrito,
  eliminarProductoDeCarrito,
  eliminarCarritoPorId,
  comprarOrdenCarrito,
} from "../controllers/carritosController.js";

const router = Router();

router.post("/crear-carrito", crearCarrito);
router.get("/carrito:id", obtenerCarritoPorId);
router.post("/carrito:id/producto:idProd", guardarProductoEnCarrito);
router.delete("/carrito:id/producto:idProd", eliminarProductoDeCarrito);
router.get("/carrito/listar", leerCarritos);
router.delete("/carrito:id", eliminarCarritoPorId);
router.post("/carrito/comprar", comprarOrdenCarrito);

comprarOrdenCarrito;

export default router;
