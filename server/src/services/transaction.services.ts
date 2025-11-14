import { TransactionRepository } from "../repositories/transaction.repositories.js";
import * as DB from "../types/db.types.js";

export const TransactionService = {
	async create(transaction: DB.CreateTransaction) {
		const result = await TransactionRepository.createTransaction(transaction);
		return result;
	},
	async delete(transactionId: string) {
		const result = await TransactionRepository.delete(transactionId);
		return result;
	},
};
