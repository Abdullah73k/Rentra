import { Router } from "express";
import {
	getUserPropertyData,
	getUserProperties,
	postPropertyInfo,
	deleteUserProperty,
	patchPropertyInfo,
	postCreateTransaction,
} from "../controllers/properties.controllers.js";
import { getUserPropertyData, getUserProperties, postPropertyInfo, deleteUserProperty, patchPropertyInfo, deleteTransaction } from "../controllers/properties.controllers.js";

const router: Router = Router();

router.get("/:userId", getUserProperties);
router.get("/:propertyId", getUserPropertyData);

router.patch("/update/:propertyId", patchPropertyInfo);

router.post("/create", postPropertyInfo);
router.post("/create/transaction", postCreateTransaction);

router.delete("/delete/:propertyId", deleteUserProperty);
router.delete("/delete/transaction/:transactionId", deleteTransaction)


export default router;
