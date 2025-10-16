import { Router } from "express";
import { getUserPropertyData, getUserProperties, postPropertyInfo, deleteUserProperty, patchPropertyInfo } from "../controllers/properties.controllers.js";

const router: Router = Router();

router.get("/:userId", getUserProperties);
router.get("/:propertyId", getUserPropertyData);
router.delete("/:propertyId", deleteUserProperty);
router.patch("/update/:propertyId", patchPropertyInfo)
router.post("/create", postPropertyInfo)

export default router;
