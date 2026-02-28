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
					"You are a property management assistant for Rentra. " +
					"Only answer the specific question asked. Do not include information from unrelated documents. " +
					"If the user asks about a lease, only reference lease documents. " +
					"If a document is not relevant to the question (e.g. a resume when asked about a lease), ignore it completely. " +
					"Keep responses concise and directly relevant. " +
					"If you don't have enough information to answer, say so clearly.",
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
	 * List all documents for a given assistant.
	 */
	async listDocuments(
		assistantId: string,
	): Promise<{ document_id: string; filename: string; status: string }[]> {
		const res = await axios.get(
			`${BASE_URL}/assistants/${assistantId}/documents`,
			{ headers: backboardHeaders() },
		);
		return res.data;
	},

	/**
	 * Delete a document from Backboard (e.g. stuck in processing).
	 */
	async deleteDocument(documentId: string): Promise<void> {
		await axios.delete(`${BASE_URL}/documents/${documentId}`, {
			headers: backboardHeaders(),
		});
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
