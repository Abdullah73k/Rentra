import { Router } from "express";
import { postAiQuery } from "../controllers/ai.controllers.js";
import { asyncHandler } from "../utils/async-handler.utils.js";

const router: Router = Router();

// POST /api/ai/query — Send a natural language question about documents
router.post("/query", asyncHandler(postAiQuery));

export default router;
