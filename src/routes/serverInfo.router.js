import { Router } from "express";
import { serverInfo } from "../controllers/serverInfoController.js";

const router = Router();

router.get("/server-info", serverInfo);

export default router;
