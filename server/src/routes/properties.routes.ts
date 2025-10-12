import { Router } from "express";
import { getUserPropertyData } from "../controllers/properties.controllers.js";
import { getUserProperties } from "../controllers/properties.controllers.js";

const router: Router = Router();

router.get("/:userId", getUserProperties);
router.get("/:propertyId", getUserPropertyData);

export default router;
