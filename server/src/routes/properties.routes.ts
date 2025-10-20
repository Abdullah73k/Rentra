import { Router } from "express";
import {
	deleteUserProperty,
	getUserProperties,
	getUserPropertyData,
	patchPropertyInfo,
	postPropertyInfo,
} from "../controllers/properties/properties.controllers.js";
import {
	deleteTransaction,
	postCreateTransaction,
} from "../controllers/properties/propertyTransactions.controllers.js";

const router: Router = Router();

router.get("/:userId", getUserProperties);
router.get("/:propertyId", getUserPropertyData);

router.patch("/update/:propertyId", patchPropertyInfo);

router.post("/create", postPropertyInfo);
router.post("/create/transaction", postCreateTransaction);

router.delete("/delete/:propertyId", deleteUserProperty);
router.delete("/delete/transaction/:transactionId", deleteTransaction);

export default router;
