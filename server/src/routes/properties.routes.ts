import { Router } from "express";
import { userProperties } from "../controllers/auth.controllers.js";

const router: Router = Router()

router.get("/properties/:userId", userProperties)

export default router