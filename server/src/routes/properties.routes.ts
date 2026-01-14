import { Router } from "express";
import {
	deleteUserProperty,
	getUserProperties,
	getUserPropertyData,
	patchPropertyData,
	postPropertyData,
	postOptionalData,
	deleteOptionalData,
} from "../controllers/property/properties.controllers.js";
import {
	deleteTransaction,
	patchTransaction,
	postCreateTransaction,
} from "../controllers/property/property-transactions.controllers.js";
import {
	deletePropertyDoc,
	getPropertyPrivateDocs,
	postPropertyPrivateDocs,
	postPropertyPhotos,
} from "../controllers/property/property-documents.controllers.js";
import { asyncHandler } from "../utils/async-handler.utils.js";
import {
	DOCUMENTS_MAX_FILES,
	PROPERTY_PHOTOS_MAX_FILES,
	uploadPropertyDocs,
} from "../middlewares/multer.middleware.js";

const router: Router = Router();

// GET
router.get("/all", asyncHandler(getUserProperties));
router.get("/:propertyId", asyncHandler(getUserPropertyData));

// POST
router.post("/docs/private/fetch", asyncHandler(getPropertyPrivateDocs)); // Use post to send body
router.post("/create/transaction", asyncHandler(postCreateTransaction));
router.post("/create", asyncHandler(postPropertyData));
router.post(
	"/photo/:propertyId",
	uploadPropertyDocs({ type: "photo" }).array(
		"photo",
		PROPERTY_PHOTOS_MAX_FILES
	),
	asyncHandler(postPropertyPhotos)
);
router.post("/optional/:propertyId", asyncHandler(postOptionalData));
router.post(
	"/docs/private",
	uploadPropertyDocs({ type: "document" }).array(
		"document",
		DOCUMENTS_MAX_FILES
	),
	asyncHandler(postPropertyPrivateDocs)
);

// DELETE
router.delete(
	"/delete/transaction/:transactionId",
	asyncHandler(deleteTransaction)
);
router.delete("/delete/:propertyId", asyncHandler(deleteUserProperty));
router.delete("/document/:documentId", asyncHandler(deletePropertyDoc));
router.delete("/optional/:optionId", asyncHandler(deleteOptionalData));

// PATCH
router.patch(
	"/update/transaction/:transactionId",
	asyncHandler(patchTransaction)
);
router.patch("/update/:propertyId", asyncHandler(patchPropertyData));

export default router;
