import { Router } from "express";
import { userProperties } from "../controllers/auth.controllers.js";

const router: Router = Router()

router.get("/:userId", userProperties)

export default router