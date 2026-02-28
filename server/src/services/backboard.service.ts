import axios from "axios";
import { BACKBOARD_API } from "../constants/key.constants.js";

const BASE_URL = "https://app.backboard.io/api";

const backboardHeaders = () => ({
	"X-API-Key": BACKBOARD_API!,
});

export const BackboardService = {
	/**
	 * Create a new Backboard assistant for a landlord.
	 * Each landlord gets their own assistant to isolate document access.
	 */
	async createAssistant(name: string): Promise<{ assistant_id: string }> {
		const res = await axios.post(
			`${BASE_URL}/assistants`,
			{
				name,
				system_prompt:
					"You are a helpful property management assistant. You help landlords understand their tenant documents including leases, IDs, and rent receipts. Answer questions concisely and accurately based on the uploaded documents. If you don't have enough information, say so clearly.",
			},
			{ headers: backboardHeaders() },
		);
		return res.data;
	},

	/**
	 * Create a conversation thread for a given assistant.
	 */
	async createThread(assistantId: string): Promise<{ thread_id: string }> {
		const res = await axios.post(
			`${BASE_URL}/assistants/${assistantId}/threads`,
			{},
			{ headers: backboardHeaders() },
		);
		return res.data;
	},

	/**
	 * Upload a document to a Backboard assistant.
	 * The file is sent as multipart/form-data.
	 */
	async uploadDocument(
		assistantId: string,
		fileBuffer: Buffer,
		fileName: string,
		contentType: string,
	): Promise<{ document_id: string }> {
		const FormData = (await import("form-data")).default;
		const form = new FormData();
		form.append("file", fileBuffer, {
			filename: fileName,
			contentType,
		});

		const res = await axios.post(
			`${BASE_URL}/assistants/${assistantId}/documents`,
			form,
			{
				headers: {
					...backboardHeaders(),
					...form.getHeaders(),
				},
			},
		);
		return res.data;
	},

	/**
	 * Send a message to a thread and get the AI response.
	 * Uses memory="Auto" for persistent context across conversations.
	 */
	async sendMessage(
		threadId: string,
		content: string,
	): Promise<{ content: string; thread_id: string }> {
		const res = await axios.post(
			`${BASE_URL}/threads/${threadId}/messages`,
			{
				content,
				stream: "false",
				memory: "Auto",
			},
			{ headers: backboardHeaders() },
		);
		return res.data;
	},
};
