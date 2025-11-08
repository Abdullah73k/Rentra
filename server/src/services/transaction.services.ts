import { TransactionRepository } from "../repositories/transaction.repositories.js";

export const TransactionService = {
	async delete(transactionId: string) {
		await TransactionRepository.delete(transactionId);
	},
};
