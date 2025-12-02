import type { TransactionPayload } from "./buildTransactionFromForm"

// Property Management Types
export type PropertyPurpose = "residential" | "commercial" | "investment" | "vacation"
export type PropertyType = "apartment" | "house" | "condo" | "office" | "retail" | "land"
export type PropertyStatus = "available" | "rented" | "sold" | "under_construction"
export type PropertyFurnishing = "unfurnished" | "semi_furnished" | "fully_furnished"
export type LeaseFrequency = "monthly" | "quarterly" | "semi_annual" | "annual"
export type TransactionType = "income" | "expense" | "repair" | "upgrade" | "management"

export interface Property {
  id: string
  purpose: PropertyPurpose
  type: PropertyType
  address: string
  country: string
  currency: string
  purchasePrice: number
  closingCosts: number
  acquisitionDate: string
  currentValue: number
  valuationDate: string
  photos?: string[]
  sold: boolean
  createdAt: string
}

export interface PropertyInfo {
  id: string
  propertyId: string
  propertyNumber: string
  bedrooms: number
  bathrooms: number
  sizeSqm: number
  status: PropertyStatus
  furnishing: PropertyFurnishing
  parking?: string
  lockerNumbers?: string[]
  notes?: string
}

export interface Tenant {
  id: string
  propertyId: string
  name: string
  phone?: string
  email: string
  createdAt: string
}

export interface Lease {
  id: string
  propertyId: string
  tenantId?: string
  start: string
  end: string
  rentAmount: number
  currency: string
  frequency: LeaseFrequency
  paymentDay: number
  deposit: number
  createdAt: string
}

export interface Loan {
  id: string
  propertyId: string
  lender: string
  termMonths: number
  monthlyPayment: number
  totalMortgageAmount: number
  interestRate: number
  createdAt: string
}

export interface Transaction {
  id: string
  propertyId: string
  leaseId?: string
  type: TransactionType
  subcategory: string
  amount: number
  currency: string
  taxRate: number
  taxAmount: number
  fxRateToBase: number
  from: string
  to: string
  method: string
  date: string
  notes?: string
  createdAt: string
}

export interface User {
  id: string
  fullName: string
  email: string
  phone?: string
  company?: string
  country?: string
  currency?: string
  vatRate?: number
  twoFactorEnabled: boolean
  passkeys: Passkey[]
  createdAt: string
}

export interface Passkey {
  id: string
  name: string
  createdAt: string
  lastUsed?: string
}
export interface Options {
  value: string;
  label: string;
}

export interface PropertyOverviewProps {
  property: Property;
  propertyInfo: PropertyInfo;
  tenant?: Tenant;
  lease?: Lease;
  loan?: Loan;
}

export type UserSettingsTab = "profile" | "security" | "preferences"

export interface AddPropertyFormData {
  // Step 1: Property
  purpose: string;
  type: string;
  address: string;
  country: string;
  currency: string;
  purchasePrice: number;
  closingCosts: number;
  acquisitionDate: string;
  currentValue: number;
  valuationDate: string;
  sold: boolean;

  // Step 2: PropertyInfo
  propertyNumber: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  status: string;
  furnishing: string;
  parking: string;
  notes: string;

  // Optional Sections toggles
  addLease: boolean;
  addTenant: boolean;
  addLoan: boolean;

  // Tenant
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;

  // Lease
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  leaseCurrency: string;
  frequency: string;
  paymentDay: number;
  deposit: number;

  // Loan
  lender: string;
  termMonths: number;
  monthlyPayment: number;
  totalMortgageAmount: number;
  interestRate: number;
}
export interface AddTransactionFormData {
  type: string;
  subcategory: string;
  amount: number;
  currency: string;
  taxRate: number;
  from: string;
  to: string;
  method: string;
  date: string;
  notes: string;
}
export interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: TransactionPayload) => void
  propertyId: string
}
export type ObjectOption = { value: string; label: string };
