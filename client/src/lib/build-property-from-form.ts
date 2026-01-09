import type { FormFields } from "@/components/modals/add-property-modal";
import {
  isCompleteLease,
  isCompleteLoan,
  isCompleteTenant,
} from "@/utils/property.utils";
import type { NewPropertyBuildType } from "./types";
import { useAuthStore } from "@/stores/auth.store";

export interface PropertyPayload {
  // TODO: type this properly later
  [key: string]: any;
}

export function buildPropertyFromForm(
  formValues: FormFields
): Omit<NewPropertyBuildType, "optionalSections"> {
  const { property, propertyInfo, optionalSections, tenant, lease, loan } =
    formValues;
  const session = useAuthStore.getState().session;
  if (!session) {
    throw new Error("Invalid session");
  }

  const userId = session.user.id;

  const newPropertyBuild: Omit<NewPropertyBuildType, "optionalSections"> = {
    property: {
      userId: userId,
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
    },
    propertyInfo: {
      propertyNumber: propertyInfo.propertyNumber,
      bedrooms: propertyInfo.bedrooms,
      bathrooms: String(propertyInfo.bathrooms),
      sizeSqm: String(propertyInfo.sizeSqm),
      status: propertyInfo.status,
      furnishing: propertyInfo.furnishing,
      parking: propertyInfo.parking || undefined,
      notes: propertyInfo.notes || undefined,
      lockerNumbers: propertyInfo.lockerNumbers,
    },

    tenant:
      optionalSections.addTenant && isCompleteTenant(tenant)
        ? {
            name: tenant.name,
            phone: tenant.phone || undefined,
            email: tenant.email,
          }
        : undefined,

    lease:
      optionalSections.addLease && isCompleteLease(lease)
        ? {
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
