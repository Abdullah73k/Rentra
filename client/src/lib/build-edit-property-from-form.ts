import type { EditPropertyBuildType } from "./types";
import { useAuthStore } from "@/stores/auth.store";
import type { EditPropertyFormFields } from "@/components/modals/edit-property-modal";

export function buildEditPropertyFromForm(
	formValues: EditPropertyFormFields
): Omit<EditPropertyBuildType, "optionalSections"> {
	const { property, propertyInfo, tenant, lease, loan } = formValues;
	const session = useAuthStore.getState().session;
	if (!session) {
		throw new Error("Invalid session");
	}

	const newPropertyBuild: Omit<EditPropertyBuildType, "optionalSections"> = {
		property: {
			id: property.id,
			userId: property.userId,
			purpose: property.purpose,
			type: property.type,
			address: property.address,
			country: property.country,
			currency: property.currency,
			purchasePrice: property.purchasePrice,
			closingCosts: property.closingCosts,
			acquisitionDate: property.acquisitionDate,
			valuationDate: property.valuationDate,
			currentValue: property.currentValue,
			sold: false,
			photos: [],
		},
		propertyInfo: {
			id: propertyInfo.id,
			propertyId: propertyInfo.propertyId,
			propertyNumber: propertyInfo.propertyNumber,
			bedrooms: propertyInfo.bedrooms,
			bathrooms: propertyInfo.bathrooms,
			sizeSqm: propertyInfo.sizeSqm,
			status: propertyInfo.status,
			furnishing: propertyInfo.furnishing,
			parking: propertyInfo.parking || undefined,
			notes: propertyInfo.notes || undefined,
			lockerNumbers: propertyInfo.lockerNumbers,
		},

		tenant: {
			id: tenant.id,
			propertyId: tenant.propertyId,
			name: tenant.name,
			phone: tenant.phone || undefined,
			email: tenant.email,
		},
		lease: {
			id: lease.id,
			propertyId: lease.propertyId,
			tenantId: lease.tenantId,
			start: lease.start,
			end: lease.end,
			rentAmount: lease.rentAmount,
			currency: property.currency,
			frequency: lease.frequency,
			paymentDay: lease.paymentDay,
			deposit: lease.deposit,
		},
		loan: {
			id: loan.id,
			propertyId: loan.propertyId,
			lender: loan.lender,
			termMonths: loan.termMonths,
			monthlyPayment: loan.monthlyPayment,
			totalMortgageAmount: loan.totalMortgageAmount,
			interestRate: loan.interestRate,
		},
	};

	return newPropertyBuild;
}
