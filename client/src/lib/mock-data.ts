import type { Property, PropertyInfo, Tenant, Lease, Loan, Transaction } from "./types"

export const mockProperty: Property = {
  id: "prop-001",
  purpose: "residential",
  type: "apartment",
  address: "123 Ocean Boulevard, Apt 4B",
  country: "United Arab Emirates",
  currency: "AED",
  purchasePrice: 850000,
  closingCosts: 25500,
  acquisitionDate: "2022-03-15",
  currentValue: 950000,
  valuationDate: "2024-11-09",
  photos: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop"],
  sold: false,
  createdAt: "2022-03-15",
}

export const mockPropertyInfo: PropertyInfo = {
  id: "info-001",
  propertyId: "prop-001",
  propertyNumber: "4B",
  bedrooms: 2,
  bathrooms: 2,
  sizeSqm: 120,
  status: "rented",
  furnishing: "fully_furnished",
  parking: "Covered Parking - Spot B12",
  lockerNumbers: ["L-4B-01", "L-4B-02"],
  notes: "Recently renovated kitchen and bathrooms. Premium building with 24/7 concierge.",
}

export const mockTenant: Tenant = {
  id: "tenant-001",
  propertyId: "prop-001",
  name: "Ahmed Al-Mansouri",
  phone: "+971 50 123 4567",
  email: "ahmed.mansouri@email.com",
  createdAt: "2023-06-01",
}

export const mockLease: Lease = {
  id: "lease-001",
  propertyId: "prop-001",
  tenantId: "tenant-001",
  start: "2023-06-01",
  end: "2025-05-31",
  rentAmount: 6500,
  currency: "AED",
  frequency: "monthly",
  paymentDay: 1,
  deposit: 13000,
  createdAt: "2023-06-01",
}

export const mockLoan: Loan = {
  id: "loan-001",
  propertyId: "prop-001",
  lender: "Emirates Islamic Bank",
  termMonths: 360,
  monthlyPayment: 3200,
  totalMortgageAmount: 680000,
  interestRate: 4.25,
  createdAt: "2022-03-15",
}

export const mockTransactions: Transaction[] = [
  {
    id: "txn-001",
    propertyId: "prop-001",
    leaseId: "lease-001",
    type: "income",
    subcategory: "Rent Collection",
    amount: 6500,
    currency: "AED",
    taxRate: 0,
    taxAmount: 0,
    fxRateToBase: 1,
    from: "Ahmed Al-Mansouri",
    to: "Account",
    method: "bank_transfer",
    date: "2024-11-01",
    notes: "Monthly rent payment",
    createdAt: "2024-11-01",
  },
  {
    id: "txn-002",
    propertyId: "prop-001",
    type: "expense",
    subcategory: "Maintenance",
    amount: 450,
    currency: "AED",
    taxRate: 5,
    taxAmount: 22.5,
    fxRateToBase: 1,
    from: "Account",
    to: "Facilities Management Co.",
    method: "bank_transfer",
    date: "2024-10-20",
    notes: "Annual HVAC maintenance",
    createdAt: "2024-10-20",
  },
]
