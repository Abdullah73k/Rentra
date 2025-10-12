import { Router } from "express";
import { userProperties } from "../controllers/auth.controllers.js";
import { getUserPropertyData } from "../controllers/properties.controllers.js";

const router: Router = Router()

router.get("/:userId", userProperties)
router.get("/:propertyId", getUserPropertyData)

export default router