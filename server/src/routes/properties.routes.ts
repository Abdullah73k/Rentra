import { Router } from "express";
import {
	deleteUserProperty,
	getUserProperties,
	getUserPropertyData,
	patchPropertyData,
	postPropertyData,
} from "../controllers/properties/properties.controllers.js";
import {
	deleteTransaction,
	patchTransaction,
	postCreateTransaction,
} from "../controllers/properties/propertyTransactions.controllers.js";
import { asyncHandler } from "../utils/async-handler.utils.js";

const router: Router = Router();

router.get("/all/:userId", asyncHandler(getUserProperties));
router.get("/:propertyId", asyncHandler(getUserPropertyData));

router.post("/create", asyncHandler(postPropertyData));
router.post("/create/transaction", asyncHandler(postCreateTransaction));

router.delete("/delete/:propertyId", asyncHandler(deleteUserProperty));
router.delete(
	"/delete/transaction/:transactionId",
	asyncHandler(deleteTransaction)
);

router.patch("/update/:propertyId", asyncHandler(patchPropertyData));
router.patch(
	"/update/transaction/:transactionId",
	asyncHandler(patchTransaction)
);

export default router;
