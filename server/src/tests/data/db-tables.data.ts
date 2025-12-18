import { randomUUID } from "node:crypto";
import * as DB from "../../types/db.types.js";

export const loanData = (overrides?: Partial<DB.Loan>) =>
	({
		propertyId: randomUUID(),
		lender: "Chase Bank",
		termMonths: 360,
		monthlyPayment: 2000.5,
		totalMortgageAmount: 400000,
		interestRate: 3.5,
		...overrides,
	} as DB.Loan);

export const tenantData = (overrides?: Partial<DB.Tenant>) =>
	({
		propertyId: randomUUID(),
		name: "Jane Doe",
		phone: 1234567890,
		email: "jane@example.com",
		...overrides,
	} as DB.Tenant);

export const leaseData = (overrides?: Partial<DB.Lease>) =>
	({
		propertyId: randomUUID(),
		tenantId: randomUUID(),
		start: new Date().toISOString().split('T')[0],
		end: new Date().toISOString().split('T')[0],
		rentAmount: 2500,
		currency: "USD",
		frequency: "monthly" as const,
		paymentDay: 1,
		deposit: 2500,
		...overrides,
	} as DB.Lease);

export const propertyData = (overrides?: Partial<DB.Property>) =>
	({
		userId: randomUUID(),
		purpose: "personal",
		type: "house",
		address: "123 Main St",
		country: "USA",
		currency: "USD",
		purchasePrice: 500000,
		closingCosts: 15000,
		acquisitionDate: new Date().toISOString().split('T')[0],
		currentValue: 550000,
		photos: ["https://example.com/photo1.jpg"],
		sold: false,
		...overrides,
	} as DB.Property);

export const propertyInfoData = (overrides?: Partial<DB.PropertyInfo>) =>
	({
		propertyNumber: "A-101",
		bedrooms: 3,
		bathrooms: 2.5,
		sizeSqm: 150,
		status: "available" as const,
		furnished: "unfurnished" as const,
		parking: "Garage",
		lockerNumber: ["L1"],
		notes: "Nice view",
		...overrides,
	} as DB.PropertyInfo);
