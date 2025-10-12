import { Router } from "express";
import { getUserPropertyData } from "../controllers/properties.controllers.js";
import { userProperties } from "../controllers/properties.controllers.js";

const router: Router = Router();

router.get("/:userId", userProperties);
router.get("/:propertyId", getUserPropertyData);

export default router;
