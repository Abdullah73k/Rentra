import type { AddPropertyFormData } from "@/lib/types"

export const PROPERTY_PURPOSES = ["residential", "commercial", "investment", "vacation"] as const
export const PROPERTY_TYPES = ["apartment", "house", "condo", "office", "retail", "land"] as const
export const PROPERTY_STATUS = ["available", "rented", "sold", "under_construction"] as const
export const FURNISHING_TYPES = ["unfurnished", "semi_furnished", "fully_furnished"] as const
export const LEASE_FREQUENCIES = ["monthly", "quarterly", "semi_annual", "annual"] as const

// const TRANSACTION_TYPES = ["income", "expense", "repair", "upgrade", "management"] as const // currently unused but kept

export const INITIAL_FORM_DATA: AddPropertyFormData = {
  // Step 1: Property
  purpose: "",
  type: "",
  address: "",
  country: "",
  currency: "AED",
  purchasePrice: 0,
  closingCosts: 0,
  acquisitionDate: "",
  currentValue: 0,
  valuationDate: "",
  sold: false,

  // Step 2: PropertyInfo
  propertyNumber: "",
  bedrooms: 0,
  bathrooms: 0,
  sizeSqm: 0,
  status: "available",
  furnishing: "unfurnished",
  parking: "",
  notes: "",

  // Optional sections
  addLease: false,
  addTenant: false,
  addLoan: false,

  // Tenant
  tenantName: "",
  tenantPhone: "",
  tenantEmail: "",

  // Lease
  leaseStart: "",
  leaseEnd: "",
  rentAmount: 0,
  leaseCurrency: "AED",
  frequency: "monthly",
  paymentDay: 1,
  deposit: 0,

  // Loan
  lender: "",
  termMonths: 0,
  monthlyPayment: 0,
  totalMortgageAmount: 0,
  interestRate: 0,
};