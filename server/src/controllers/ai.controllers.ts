import type { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import axios from "axios";
import { StatusCodes } from "../constants/status-codes.constants.js";
import { ValidationError } from "../errors/validation.errors.js";
import { BackboardService } from "../services/backboard.service.js";
import { dbConnection } from "../utils/db-connects.utils.js";
import { aiThreads } from "../db/schemas/ai-thread.db.js";

/**
 * POST /api/ai/query
 * Send a natural language question to the AI about uploaded documents.
 * Creates a Backboard assistant + thread on first use (lazy initialization).
 */
export const postAiQuery = async (req: Request, res: Response) => {
	const { message } = req.body;
	const userId = req.user?.id;

	if (!userId) {
		throw new ValidationError("User not authenticated");
	}

	if (!message || typeof message !== "string" || message.trim().length === 0) {
		throw new ValidationError("Message is required");
	}

	const db = dbConnection();

	// Check if user already has a Backboard assistant + thread
	let userThread = await db
		.select()
		.from(aiThreads)
		.where(eq(aiThreads.userId, userId))
		.limit(1)
		.then((rows) => rows[0] ?? null);

	// Lazy initialization: create assistant + thread on first query
	if (!userThread) {
		const assistant = await BackboardService.createAssistant(
			`Rentra Assistant - ${userId}`,
		);

		const thread = await BackboardService.createThread(assistant.assistant_id);

		const newRow = {
			id: randomUUID(),
			userId,
			assistantId: assistant.assistant_id,
			threadId: thread.thread_id,
		};

		await db.insert(aiThreads).values(newRow);
		userThread = { ...newRow, createdAt: new Date() };
	}

	// Send message to Backboard and get AI response
	try {
		const aiResponse = await BackboardService.sendMessage(
			userThread.threadId,
			message.trim(),
		);

		return res.status(StatusCodes.SUCCESS).json({
			error: false,
			message: "AI response generated",
			data: {
				content: aiResponse.content,
				threadId: userThread.threadId,
			},
		});
	} catch (error) {
		// Handle Backboard-specific errors (e.g. documents still indexing)
		if (axios.isAxiosError(error) && error.response?.data?.detail) {
			const detail: string = error.response.data.detail;

			if (detail.includes("still being indexed")) {
				return res.status(StatusCodes.SUCCESS).json({
					error: false,
					message: "AI response generated",
					data: {
						content:
							"Your documents are still being processed by the AI. Please wait a minute and try again — this only happens once after uploading new files.",
						threadId: userThread.threadId,
					},
				});
			}

			return res.status(StatusCodes.BAD_REQUEST).json({
				error: true,
				message: detail,
			});
		}

		throw error;
	}
};
