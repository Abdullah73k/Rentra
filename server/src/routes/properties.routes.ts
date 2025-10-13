import { Router } from "express";
import {
	deleteUserProperty,
	getUserPropertyData,
} from "../controllers/properties.controllers.js";
import { getUserProperties } from "../controllers/properties.controllers.js";

const router: Router = Router();

router.get("/:userId", getUserProperties);
router.get("/:propertyId", getUserPropertyData);
router.delete("/:propertyId", deleteUserProperty);

export default router;
