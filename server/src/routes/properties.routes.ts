import { Router } from "express";
import { getUserPropertyData, getUserProperties, postUserPropertyData, deleteUserProperty, patchPropertyInfo } from "../controllers/properties.controllers.js";

const router: Router = Router();

router.get("/:userId", getUserProperties);
router.get("/:propertyId", getUserPropertyData);
router.delete("/:propertyId", deleteUserProperty);
router.patch("/:propertyId", patchPropertyInfo)
router.post("/create", postUserPropertyData)

export default router;
