import { Router } from "express";
import {
	deletePropertyDoc,
	deleteUserProperty,
	getPropertyDoc,
	getUserProperties,
	getUserPropertyData,
	patchPropertyData,
	postPropertyData,
	postPropertyPhotos,
} from "../controllers/properties/properties.controllers.js";
import {
	deleteTransaction,
	patchTransaction,
	postCreateTransaction,
} from "../controllers/properties/propertyTransactions.controllers.js";
import { asyncHandler } from "../utils/async-handler.utils.js";
import { uploadPropertyPhotos } from "../middlewares/multer.middleware.js";

const router: Router = Router();

router.get("/all/:userId", asyncHandler(getUserProperties));
router.get("/:propertyId", asyncHandler(getUserPropertyData));
router.get("/document/:propertyId", asyncHandler(getPropertyDoc));

router.post("/create", asyncHandler(postPropertyData));
router.post("/create/transaction", asyncHandler(postCreateTransaction));
router.post(
	"/:userId/:propertyId/photo",
	uploadPropertyPhotos,
	asyncHandler(postPropertyPhotos)
);

router.delete("/delete/:propertyId", asyncHandler(deleteUserProperty));
router.delete(
	"/delete/transaction/:transactionId",
	asyncHandler(deleteTransaction)
);
router.delete("/document/:propertyId", asyncHandler(deletePropertyDoc));

router.patch("/update/:propertyId", asyncHandler(patchPropertyData));
router.patch(
	"/update/transaction/:transactionId",
	asyncHandler(patchTransaction)
);

export default router;
