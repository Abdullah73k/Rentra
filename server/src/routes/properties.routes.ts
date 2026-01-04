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

router.get("/all", asyncHandler(getUserProperties));
router.get("/:propertyId", asyncHandler(getUserPropertyData));
router.get(
	"/privateDocs/:referenceId",
	uploadPropertyDocs({ type: "document" }).array(
		"document",
		DOCUMENTS_MAX_FILES
	),
	asyncHandler(getPropertyPrivateDocs)
);

router.post("/create", asyncHandler(postPropertyData));
router.post("/create/transaction", asyncHandler(postCreateTransaction));
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
	"/privateDocs/:referenceId",
	uploadPropertyDocs({ type: "document" }).array(
		"document",
		DOCUMENTS_MAX_FILES
	),
	asyncHandler(postPropertyPrivateDocs)
);

router.delete("/delete/:propertyId", asyncHandler(deleteUserProperty));
router.delete(
	"/delete/transaction/:transactionId",
	asyncHandler(deleteTransaction)
);
router.delete("/document/:documentId", asyncHandler(deletePropertyDoc));
router.delete("/optional/:optionId", asyncHandler(deleteOptionalData));

router.patch("/update/:propertyId", asyncHandler(patchPropertyData));
router.patch(
	"/update/transaction/:transactionId",
	asyncHandler(patchTransaction)
);

export default router;
