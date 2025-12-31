import { Router } from "express";
import {
	deleteUserProperty,
	getUserProperties,
	getUserPropertyData,
	patchPropertyData,
	postPropertyData,
} from "../controllers/properties.controllers.js";
import {
	deleteTransaction,
	patchTransaction,
	postCreateTransaction,
} from "../controllers/property-transactions.controllers.js";
import {
	deletePropertyDoc,
	getPropertyPrivateDocs,
	postPropertyPhotos,
} from "../controllers/property-documents.controllers.js";
import { asyncHandler } from "../utils/async-handler.utils.js";
import { uploadPropertyPhotos } from "../middlewares/multer.middleware.js";

const router: Router = Router();

router.get("/all", asyncHandler(getUserProperties));

router.get("/:propertyId", asyncHandler(getUserPropertyData));
router.get("/privateDocs/:referenceId", asyncHandler(getPropertyPrivateDocs));

router.post("/create", asyncHandler(postPropertyData));
router.post("/create/transaction", asyncHandler(postCreateTransaction));
router.post(
	"/photo/:propertyId",
	uploadPropertyPhotos,
	asyncHandler(postPropertyPhotos)
);

router.delete("/delete/:propertyId", asyncHandler(deleteUserProperty));
router.delete(
	"/delete/transaction/:transactionId",
	asyncHandler(deleteTransaction)
);
router.delete("/document/:documentId", asyncHandler(deletePropertyDoc));

router.patch("/update/:propertyId", asyncHandler(patchPropertyData));
router.patch(
	"/update/transaction/:transactionId",
	asyncHandler(patchTransaction)
);

export default router;
