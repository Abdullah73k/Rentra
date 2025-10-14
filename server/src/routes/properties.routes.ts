import { Router } from "express";
import { getUserPropertyData, getUserProperties, postUserPropertyData, deleteUserProperty } from "../controllers/properties.controllers.js";

const router: Router = Router();

router.get("/:userId", getUserProperties);
router.get("/:propertyId", getUserPropertyData);
router.delete("/:propertyId", deleteUserProperty);

router.post("/", postUserPropertyData)

export default router;
