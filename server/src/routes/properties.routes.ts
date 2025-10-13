import { Router } from "express";
import { getUserPropertyData, getUserProperties, postUserPropertyData } from "../controllers/properties.controllers.js";

const router: Router = Router();

router.get("/:userId", getUserProperties);
router.get("/:propertyId", getUserPropertyData);

router.post("/", postUserPropertyData)

export default router;
