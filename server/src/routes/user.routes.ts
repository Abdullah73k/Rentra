import { Router } from "express";
import { patchUserAvatar } from "../controllers/user-avatar.controllers.js";
import { uploadAvatar } from "../middlewares/multer.middleware.js";
import { asyncHandler } from "../utils/async-handler.utils.js";

const router: Router = Router();

router.patch("/avatar", uploadAvatar, asyncHandler(patchUserAvatar));

export default router;
