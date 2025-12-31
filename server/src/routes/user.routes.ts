import { Router } from "express";
import { patchUserAvatar } from "../controllers/user-avatar.controllers.js";

const router: Router = Router()

router.patch("/avatar", patchUserAvatar)

export default router