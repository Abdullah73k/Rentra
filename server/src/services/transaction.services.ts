import { TransactionRepository } from "../repositories/transaction.repositories.js";

export const TransactionService = {
	async delete(transactionId: string) {
		const result = await TransactionRepository.delete(transactionId);
        return result
	},
};
