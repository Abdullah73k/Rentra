import type { FormFields } from "@/components/modals/addPropertyModal";
import { v4 as uuidv4 } from "uuid";

export interface PropertyPayload {
  // TODO: type this properly later
  [key: string]: any;
}

export function buildPropertyFromForm(formValues: FormFields): PropertyPayload {
  const { property, propertyInfo, optionalSections, tenant, lease, loan } = formValues;
  const propertyId = uuidv4();
  const tenantId = optionalSections.addTenant ? uuidv4() : undefined;
  const now = new Date().toISOString();

  return {
    id: propertyId,
    purpose: property.purpose,
    type: property.type,
    address: property.address,
    country: property.country,
    currency: property.currency,
    purchasePrice: property.purchasePrice,
    closingCosts: property.closingCosts,
    acquisitionDate: property.acquisitionDate,
    currentValue: property.currentValue,
    valuationDate: property.valuationDate,
    sold: false, // Assuming default false since not present in form
    photos: [],
    createdAt: now,
    info: {
      id: uuidv4(),
      propertyId,
      propertyNumber: propertyInfo.propertyNumber,
      bedrooms: propertyInfo.bedrooms,
      bathrooms: propertyInfo.bathrooms,
      sizeSqm: propertyInfo.sizeSqm,
      status: propertyInfo.status,
      furnishing: propertyInfo.furnishing,
      parking: propertyInfo.parking || undefined,
      notes: propertyInfo.notes || undefined,
    },
    tenant: optionalSections.addTenant
      ? {
        id: tenantId,
        propertyId,
        name: tenant?.tenantName,
        phone: tenant?.tenantPhone || undefined,
        email: tenant?.tenantEmail,
        createdAt: now,
      }
      : undefined,
    lease: optionalSections.addLease
      ? {
        id: uuidv4(),
        propertyId,
        tenantId,
        start: lease?.leaseStart,
        end: lease?.leaseEnd,
        rentAmount: lease?.rentAmount,
        currency: property.currency, // Reusing property currency
        frequency: lease?.frequency,
        paymentDay: lease?.paymentDay,
        deposit: lease?.deposit,
        createdAt: now,
      }
      : undefined,
    loan: optionalSections.addLoan
      ? {
        id: uuidv4(),
        propertyId,
        lender: loan?.lender,
        termMonths: loan?.termMonths,
        monthlyPayment: loan?.monthlyPayment,
        totalMortgageAmount: loan?.totalMortgageAmount,
        interestRate: loan?.interestRate,
        createdAt: now,
      }
      : undefined,
  };
}