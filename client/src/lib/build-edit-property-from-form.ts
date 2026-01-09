import type { EditPropertyBuildType } from "./types";
import { useAuthStore } from "@/stores/auth.store";
import type { EditPropertyFormFields } from "@/components/modals/edit-property-modal";
import {
  isCompleteLease,
  isCompleteLoan,
  isCompleteTenant,
} from "@/utils/property.utils";

export function buildEditPropertyFromForm(
  formValues: EditPropertyFormFields
): Omit<EditPropertyBuildType, "optionalSections"> {
  const { property, propertyInfo, tenant, lease, loan, optionalSections } =
    formValues;
  const session = useAuthStore.getState().session;
  if (!session) {
    throw new Error("Invalid session");
  }
  const today = new Date();
  const newPropertyBuild: Omit<EditPropertyBuildType, "optionalSections"> = {
    property: {
      id: property.id,
      userId: property.userId,
      purpose: property.purpose,
      type: property.type,
      address: property.address,
      country: property.country,
      currency: property.currency,
      purchasePrice: String(property.purchasePrice),
      closingCosts: String(property.closingCosts),
      acquisitionDate: property.acquisitionDate,
      valuationDate: property.valuationDate,
      currentValue: String(property.currentValue),
      sold: false,
      photos: [],
      createdAt: property.createdAt,
      updatedAt: today,
    },
    propertyInfo: {
      id: propertyInfo.id,
      propertyId: propertyInfo.propertyId,
      propertyNumber: propertyInfo.propertyNumber,
      bedrooms: propertyInfo.bedrooms,
      bathrooms: String(propertyInfo.bathrooms),
      sizeSqm: String(propertyInfo.sizeSqm),
      status: propertyInfo.status,
      furnishing: propertyInfo.furnishing,
      parking: propertyInfo.parking || undefined,
      notes: propertyInfo.notes || undefined,
      lockerNumbers: propertyInfo.lockerNumbers,
      createdAt: propertyInfo.createdAt,
      updatedAt: today,
    },

    tenant:
      optionalSections.addTenant && isCompleteTenant(tenant)
        ? {
            id: tenant.id,
            propertyId: tenant.propertyId,
            name: tenant.name,
            phone: tenant.phone || undefined,
            email: tenant.email,
          }
        : undefined,
    lease:
      optionalSections.addLease && isCompleteLease(lease)
        ? {
            id: lease.id,
            propertyId: lease.propertyId,
            tenantId: lease.tenantId,
            start: lease.start,
            end: lease.end,
            rentAmount: String(lease.rentAmount),
            currency: property.currency,
            frequency: lease.frequency,
            paymentDay: lease.paymentDay,
            deposit: String(lease.deposit),
          }
        : undefined,
    loan:
      optionalSections.addLoan && isCompleteLoan(loan)
        ? {
            id: loan.id,
            propertyId: loan.propertyId,
            lender: loan.lender,
            termMonths: loan.termMonths,
            monthlyPayment: String(loan.monthlyPayment),
            totalMortgageAmount: String(loan.totalMortgageAmount),
            interestRate: String(loan.interestRate),
          }
        : undefined,
  };

  return newPropertyBuild;
}
