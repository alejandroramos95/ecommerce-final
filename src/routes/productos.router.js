import { Router } from "express";
import {
  leerProductos,
  listarPorCategoria,
  listarPorId,
  guardoProductoEnDB,
  borrarProducto,
  actualizarProducto,
} from "../controllers/productosController.js";
import { validarAdmin } from "../middlewares/webAuth.js";
import passport from "../middlewares/Passport.js";

const router = Router();

router.get(
  "/productos",
  passport.authenticate("jwt", { session: false }),
  leerProductos
);
router.get(
  "/productos/categ/:categoria",
  passport.authenticate("jwt", { session: false }),
  listarPorCategoria
);
router.get(
  "/productos/id/:id",
  passport.authenticate("jwt", { session: false }),
  listarPorId
);
router.post(
  "/productos",
  passport.authenticate("jwt", { session: false }),
  validarAdmin,
  guardoProductoEnDB
);
router.put(
  "/productos/:id",

  passport.authenticate("jwt", { session: false }),
  validarAdmin,
  actualizarProducto
);
router.delete(
  "/productos/:id",

  passport.authenticate("jwt", { session: false }),
  validarAdmin,
  borrarProducto
);

export default router;
