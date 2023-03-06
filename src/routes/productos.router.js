import { Router } from "express";
import {
  leerProductos,
  listarPorCategoria,
  listarPorId,
  guardoProductoEnDB,
  borrarProducto,
  actualizarProducto,
} from "../controllers/productosController.js";
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
  guardoProductoEnDB
);
router.put(
  "/productos/:id",
  passport.authenticate("jwt", { session: false }),
  actualizarProducto
);
router.delete(
  "/productos/:id",
  passport.authenticate("jwt", { session: false }),
  borrarProducto
);

export default router;
