import type { FormFields } from "@/components/modals/add-property-modal";
import { v4 as uuidv4 } from "uuid";
import type z from "zod";
import type { propertyDataSchema } from "./schemas";
import { isCompleteLease, isCompleteLoan, isCompleteTenant } from "@/utils/property.utils";

export interface PropertyPayload {
  // TODO: type this properly later
  [key: string]: any;
}

type NewPropertyBuildType = z.infer<typeof propertyDataSchema>

export function buildPropertyFromForm(formValues: FormFields): Omit<NewPropertyBuildType, "optionalSections"> {
  const { property, propertyInfo, optionalSections, tenant, lease, loan } = formValues;
  const userId = uuidv4(); // TODO: get actual userId

  const newPropertyBuild: Omit<NewPropertyBuildType, "optionalSections"> = {
    property: {
      userId: userId,
      purpose: property.purpose,
      type: property.type,
      address: property.address,
      country: property.country,
      currency: property.currency,
      purchasePrice: property.purchasePrice,
      closingCosts: property.closingCosts,
      acquisitionDate: property.acquisitionDate,
      currentValue: property.currentValue,
      sold: false,
      photos: [],
    },
    propertyInfo: {
      propertyNumber: propertyInfo.propertyNumber,
      bedrooms: propertyInfo.bedrooms,
      bathrooms: propertyInfo.bathrooms,
      sizeSqm: propertyInfo.sizeSqm,
      status: propertyInfo.status,
      furnished: propertyInfo.furnished,
      parking: propertyInfo.parking || undefined,
      notes: propertyInfo.notes || undefined,
      lockerNumber: propertyInfo.lockerNumber,
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
          rentAmount: lease.rentAmount,
          currency: property.currency,
          frequency: lease.frequency,
          paymentDay: lease.paymentDay,
          deposit: lease.deposit,
        }
        : undefined,

    loan:
      optionalSections.addLoan && isCompleteLoan(loan)
        ? {
          lender: loan.lender,
          termMonths: loan.termMonths,
          monthlyPayment: loan.monthlyPayment,
          totalMortgageAmount: loan.totalMortgageAmount,
          interestRate: loan.interestRate,
        }
        : undefined,
  };

  return newPropertyBuild
}