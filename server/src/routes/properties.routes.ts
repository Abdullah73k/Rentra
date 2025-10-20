import { Router } from "express";
import { getUserPropertyData, getUserProperties, postPropertyInfo, deleteUserProperty, patchPropertyInfo, deleteTransaction } from "../controllers/properties.controllers.js";

const router: Router = Router();

router.get("/:userId", getUserProperties);
router.get("/:propertyId", getUserPropertyData);

router.delete("/delete/:propertyId", deleteUserProperty);
router.delete("/delete/transaction/:transactionId", deleteTransaction)

router.post("/create", postPropertyInfo)

router.patch("/update/:propertyId", patchPropertyInfo)
router.patch("/update/transaction/:transactionId")

export default router;
