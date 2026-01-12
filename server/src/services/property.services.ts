import { SUPABASE_PUBLIC_BUCKET_NAME } from "../constants/supabase.constants.js";
import { DocumentRepository } from "../repositories/document.repositories.js";
import { LeaseRepository } from "../repositories/lease.repositories.js";
import { LoanRepository } from "../repositories/loan.repositories.js";
import { PropertyRepository } from "../repositories/property.repositories.js";
import { PropertyInfoRepository } from "../repositories/propertyInfo.repositories.js";
import { TenantRepository } from "../repositories/tenant.repositories.js";
import { TransactionRepository } from "../repositories/transaction.repositories.js";
import * as API from "../types/api.types.js";
import * as DB from "../types/db.types.js";
import { getFilePublicURL } from "../utils/bucket.utils.js";
import { queryInTransaction, type PoolClient } from "../utils/service.utils.js";

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

		const documents = await DocumentRepository.getAllDocuments(
			properties.map((p) => p.id)
		);
		const paths = documents.map((doc) => {
			return getFilePublicURL({
				path: doc.path,
				bucket: SUPABASE_PUBLIC_BUCKET_NAME,
				id: doc.propertyId!,
			});
		});

		let response: DB.Property[] = [];

		properties.forEach((property) => {
			const photos = paths
				.filter((path) => path.id === property.id)
				.map((p) => p.publicUrl);
			response.push({ ...property, photos });
		});

		return response;
	},
	async delete(propertyId: string) {
		await PropertyRepository.deleteProperty(propertyId);
	},
	async getAllData(propertyId: string) {
		const queryFn = async (propertyId: string, client: PoolClient) => {
			const property = await PropertyRepository.getProperty(propertyId, client);
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
				property,
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
	async update(data: API.PATCHPropertyData) {
		const queryFn = async (data: API.PATCHPropertyData, client: PoolClient) => {
			const propertyId = data.property.id;
			const property = await PropertyRepository.updateProperty(
				propertyId,
				data.property,
				client
			);
			const propertyInfo = await PropertyInfoRepository.updatePropertyInfo(
				propertyId,
				data.propertyInfo,
				client
			);
			const loan = data.loan
				? await LoanRepository.updateLoan(propertyId, data.loan, client)
				: undefined;
			const tenant = data.tenant
				? await TenantRepository.updateTenant(propertyId, data.tenant, client)
				: undefined;
			const lease = data.lease
				? await LeaseRepository.updateLease(propertyId, data.lease, client)
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
			"Update property failed transaction"
		);
		return query;
	},
	async createOptionalData(
		option: "loan" | "lease" | "tenant",
		data: DB.Optional
	) {
		const response = await PropertyRepository.createOptionalData(option, data);

		return response;
	},
	async deleteOptionalData(
		option: "loan" | "lease" | "tenant",
		referenceId: string
	) {
		const response = await PropertyRepository.deleteOptionalData(
			option,
			referenceId
		);

		return response;
	},
};
