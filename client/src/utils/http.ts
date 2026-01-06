import { API_URL } from "@/constants/api.constants";
import type { patchTransactionSchema } from "@/lib/schemas";
import type { EditPropertyBuildType, FetchPropertyReturnType, NewPropertyBuildType, Transaction, WithId } from "@/lib/types";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type z from "zod";

export const queryClient = new QueryClient();

export async function createNewProperty(
	propertyData: Omit<NewPropertyBuildType, "optionalSections">
) {
	try {
		const res = await axios.post(
			API_URL + "/api/properties/create",
			propertyData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		console.log(res); // TODO: remove when getting ready for production

		const { property } = res.data;
		console.log(property); // TODO: remove when getting ready for production

		return property;
	} catch (error) {
		throw new Error("An error occurred while creating the property");
	}
}
export async function fetchProperties(
	userId: string
): Promise<WithId<NewPropertyBuildType["property"]>[]> {
	try {
		const res = await axios.get(`${API_URL}/api/properties/all/${userId}`);
		return res.data.data;
	} catch (error) {
		throw new Error("An error occurred while fetching properties");
	}
}
export async function createNewTransaction(data: Transaction) {
	try {
		const res = await axios.post(
			API_URL + "/api/properties/create/transaction",
			{ transactionDetails: data },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return res.data;
	} catch (error) {
		throw new Error("An error occurred while creating the transaction");
	}
}
export async function fetchPropertyInfo(propertyId: string): Promise<FetchPropertyReturnType> {
	try {
		const res = await axios.get(`${API_URL}/api/properties/${propertyId}`);
		return res.data.data;
	} catch (error) {
		throw new Error("An error occurred while fetching the property info");
	}
}
export async function editPropertyInfo(data: Omit<EditPropertyBuildType, "optionalSections">) {
	try {
		const res = await axios.patch(API_URL + "/api/properties/update/" + data.property.id, data)
		return res.data.data
	} catch (error) {
		
	}
}
export async function editTransaction(data: z.input<typeof patchTransactionSchema>) {
	try {
		const res = await axios.patch(API_URL + "/api/properties/update/transaction/" + data.id, data)
		return res.data.data
	} catch (error) {
		
	}
}