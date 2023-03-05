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
import passport from "../middlewares/Passport.js";

const router = Router();

router.post(
  "/crear-carrito",
  passport.authenticate("jwt", { session: false }),
  crearCarrito
);
router.get(
  "/carrito:id",
  passport.authenticate("jwt", { session: false }),
  obtenerCarritoPorId
);
router.post(
  "/carrito:id/producto:idProd",
  passport.authenticate("jwt", { session: false }),
  guardarProductoEnCarrito
);
router.delete(
  "/carrito:id/producto:idProd",
  passport.authenticate("jwt", { session: false }),
  eliminarProductoDeCarrito
);
router.get(
  "/carrito/listar",
  passport.authenticate("jwt", { session: false }),
  leerCarritos
);
router.delete(
  "/carrito:id",
  passport.authenticate("jwt", { session: false }),
  eliminarCarritoPorId
);
router.post(
  "/carrito/comprar",
  passport.authenticate("jwt", { session: false }),
  comprarOrdenCarrito
);

export default router;
