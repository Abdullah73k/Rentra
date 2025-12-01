import type { AddPropertyFormData, AddTransactionFormData } from "@/lib/types";

export const PROPERTY_PURPOSES = [
  "residential",
  "commercial",
  "investment",
  "vacation",
] as const;
export const PROPERTY_TYPES = [
  "apartment",
  "house",
  "condo",
  "office",
  "retail",
  "land",
] as const;
export const PROPERTY_STATUS = [
  "available",
  "rented",
  "sold",
  "under_construction",
] as const;
export const FURNISHING_TYPES = [
  "unfurnished",
  "semi_furnished",
  "fully_furnished",
] as const;
export const LEASE_FREQUENCIES = [
  "monthly",
  "quarterly",
  "semi_annual",
  "annual",
] as const;
export const TRANSACTION_TYPES = [
  "income",
  "expense",
  "repair",
  "upgrade",
  "management",
] as const;

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

export const INITIAL_TRANSACTION_FORM: AddTransactionFormData = {
  type: "expense",
  subcategory: "",
  amount: 0,
  currency: "AED",
  taxRate: 0,
  from: "",
  to: "",
  method: "bank_transfer",
  date: new Date().toISOString().split("T")[0],
  notes: "",
};

export const PAYMENT_METHODS = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash", label: "Cash" },
  { value: "check", label: "Check" },
  { value: "credit_card", label: "Credit Card" },
];

export const ADD_PROPERTY_DEFAULT_VALUES = {
    property: {
      purpose: "",
      type: "",
      address: "",
      country: "",
      currency: "",
      purchasePrice: 0,
      closingCosts: 0,
      acquisitionDate: "",
      currentValue: 0,
      valuationDate: "",
      sold: false,
    },
    propertyInfo: {
      propertyNumber: "",
      bedrooms: 0,
      bathrooms: 0,
      sizeSqm: 0,
      status: "",
      furnishing: "",
      parking: "",
      notes: "",
    },
    optionalSections: {
      addTenant: false,
      addLease: false,
      addLoan: false,
    },
  }