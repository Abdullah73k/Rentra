import { Router } from "express";
import { userProperties } from "../controllers/properties.controllers.js";

const router: Router = Router()

router.get("/:userId", userProperties)

export default router