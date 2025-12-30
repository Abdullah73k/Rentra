import { Router } from "express";
import { putUserAvatar } from "../controllers/user-avatar.controllers.js";

const router: Router = Router()

router.put("/avatar", putUserAvatar)

export default router