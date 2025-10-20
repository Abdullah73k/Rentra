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
	patchTransaction,
	postCreateTransaction,
} from "../controllers/properties/propertyTransactions.controllers.js";

const router: Router = Router();

router.get("/:userId", getUserProperties);
router.get("/:propertyId", getUserPropertyData);


router.post("/create", postPropertyInfo);
router.post("/create/transaction", postCreateTransaction);


router.delete("/delete/:propertyId", deleteUserProperty);
router.delete("/delete/transaction/:transactionId", deleteTransaction)


router.patch("/update/:propertyId", patchPropertyInfo)
router.patch("/update/transaction/:transactionId", patchTransaction)


export default router;
