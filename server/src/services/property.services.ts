import { LeaseRepository } from "../repositories/lease.repositories.js";
import { LoanRepository } from "../repositories/loan.repositories.js";
import { PropertyRepository } from "../repositories/property.repositories.js";
import { PropertyInfoRepository } from "../repositories/propertyInfo.repositories.js";
import { TenantRepository } from "../repositories/tenant.repositories.js";
import * as DB from "../types/db.types.js";
import { queryInTransaction } from "../utils/service.utils.js";

export const PropertyService = {
	async create(data: DB.POSTPropertyData) {
		const queryFn = async (propertyData: DB.POSTPropertyData) => {
			const property = await PropertyRepository.createProperty(
				propertyData.property
			);
			const propertyInfo = await PropertyInfoRepository.createPropertyInfo(
				propertyData.propertyInfo
			);
			const loan = propertyData.loan
				? await LoanRepository.createLoan(propertyData.loan)
				: undefined;
			const tenant = propertyData.tenant
				? await TenantRepository.createTenant(propertyData.tenant)
				: undefined;
			const lease = propertyData.lease
				? await LeaseRepository.createLease(propertyData.lease)
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
};
