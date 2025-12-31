import { Router } from "express";
import { patchUserAvatar } from "../controllers/user-avatar.controllers.js";
import { uploadAvatar } from "../middlewares/multer.middleware.js";

const router: Router = Router();

router.patch("/avatar", uploadAvatar, patchUserAvatar);

export default router;
