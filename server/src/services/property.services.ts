import { LeaseRepository } from "../repositories/lease.repositories.js";
import { LoanRepository } from "../repositories/loan.repositories.js";
import { PropertyRepository } from "../repositories/property.repositories.js";
import { PropertyInfoRepository } from "../repositories/propertyInfo.repositories.js";
import { TenantRepository } from "../repositories/tenant.repositories.js";
import { TransactionRepository } from "../repositories/transaction.repositories.js";
import * as API from "../types/api.types.js";
import { queryInTransaction, type PoolClient } from "../utils/service.utils.js";
import { pool } from "../db/configs/pg.config.js";

export const PropertyService = {
	async create(data: API.POSTPropertyData) {
		const queryFn = async (
			propertyData: API.POSTPropertyData,
			client: PoolClient
		) => {
			const property = await PropertyRepository.createProperty(
				propertyData.property,
				client
			);
			const propertyInfo = await PropertyInfoRepository.createPropertyInfo(
				propertyData.propertyInfo,
				property[0]!.id,
				client
			);
			const loan = propertyData.loan
				? await LoanRepository.createLoan(
						propertyData.loan,
						property[0]!.id,
						client
				  )
				: undefined;
			const tenant = propertyData.tenant
				? await TenantRepository.createTenant(
						propertyData.tenant,
						property[0]!.id,
						client
				  )
				: undefined;
			const lease = propertyData.lease
				? await LeaseRepository.createLease(
						propertyData.lease,
						property[0]!.id,
						tenant![0]!.id,
						client
				  )
				: undefined;
			return {
				property,
				propertyInfo,
				loan,
				tenant,
				lease,
			};
		};

		const query = await queryInTransaction(
			queryFn,
			data,
			"Insert property data failed transaction"
		);

		return query;
	},
	async getAll(userId: string) {
		const properties = await PropertyRepository.getProperties(userId);
		return properties;
	},
	async delete(propertyId: string) {
		await PropertyRepository.deleteProperty(propertyId);
	},
	async getAllData(propertyId: string) {
		const client = await pool.connect();

		const queryFn = async (propertyId: string, client: PoolClient) => {
			const propertyInfo = await PropertyInfoRepository.getPropertyInfo(
				propertyId,
				client
			);
			const loan = await LoanRepository.getLoan(propertyId, client);
			const tenant = await TenantRepository.getTenant(propertyId, client);
			const lease = await LeaseRepository.getLease(propertyId, client);
			const transaction = await TransactionRepository.getTransaction(
				propertyId,
				client
			);

			return {
				propertyInfo,
				loan,
				tenant,
				lease,
				transaction,
			};
		};

		const result = await queryInTransaction(
			queryFn,
			propertyId,
			"Could not fetch all property data"
		);
		return result;
	},
	async update() {},
};
