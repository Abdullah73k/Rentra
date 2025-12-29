import { z } from "zod";
import type {
	patchPropertyDataSchema,
	propertyDataSchema,
	transactionSchema,
} from "./schemas";

// Property Management Types
export type PropertyPurpose =
	| "residential"
	| "commercial"
	| "investment"
	| "vacation";
export type PropertyType =
	| "apartment"
	| "house"
	| "condo"
	| "office"
	| "retail"
	| "land";
export type PropertyStatus =
	| "available"
	| "rented"
	| "sold"
	| "under_construction";
export type PropertyFurnishing =
	| "unfurnished"
	| "semi_furnished"
	| "fully_furnished";
export type LeaseFrequency = "monthly" | "quarterly" | "semi_annual" | "annual";
export type TransactionType =
	| "income"
	| "expense"
	| "repair"
	| "upgrade"
	| "management";

export interface Property {
	id: string;
	purpose: PropertyPurpose;
	type: PropertyType;
	address: string;
	country: string;
	currency: string;
	purchasePrice: number;
	closingCosts: number;
	acquisitionDate: string;
	currentValue: number;
	valuationDate: string;
	photos?: string[];
	sold: boolean;
	createdAt: string;
}

export interface PropertyInfo {
	id: string;
	propertyId: string;
	propertyNumber: string;
	bedrooms: number;
	bathrooms: number;
	sizeSqm: number;
	status: PropertyStatus;
	furnishing: PropertyFurnishing;
	parking?: string;
	lockerNumbers?: string[];
	notes?: string;
}

export interface Tenant {
	id: string;
	propertyId: string;
	name: string;
	phone?: string;
	email: string;
	createdAt: string;
}

export interface Lease {
	id: string;
	propertyId: string;
	tenantId?: string;
	start: string;
	end: string;
	rentAmount: number;
	currency: string;
	frequency: LeaseFrequency;
	paymentDay: number;
	deposit: number;
	createdAt: string;
}

export interface Loan {
	id: string;
	propertyId: string;
	lender: string;
	termMonths: number;
	monthlyPayment: number;
	totalMortgageAmount: number;
	interestRate: number;
	createdAt: string;
}
export interface User {
	id: string;
	fullName: string;
	email: string;
	phone?: string;
	company?: string;
	country?: string;
	currency?: string;
	vatRate?: number;
	twoFactorEnabled: boolean;
	passkeys: Passkey[];
	createdAt: string;
}

export interface Passkey {
	id: string;
	name: string;
	createdAt: string;
	lastUsed?: string;
}
export interface SelectOptions {
	value: string | boolean;
	label: string;
}

export interface PropertyOverviewProps {
	property: Property;
	propertyInfo: PropertyInfo;
	tenant?: Tenant;
	lease?: Lease;
	loan?: Loan;
}

export type UserSettingsTab = "profile" | "security" | "preferences";

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
export type Transaction = z.infer<typeof transactionSchema>;

export interface AddTransactionModalProps {
	isOpen: boolean;
	onClose: () => void;
	propertyId: string;
}
export type NavigationLink = {
	title: string;
	href: string;
	description: string;
	visibleTo: "all" | "unauthenticated" | "authenticated";
};

export type Session = {
	user: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		email: string;
		emailVerified: boolean;
		name: string;
		image?: string | null | undefined;
		country: string;
		currency: string;
		vatProfile: number;
		twoFactorEnabled: boolean | null | undefined;
	};
	session: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		userId: string;
		expiresAt: Date;
		token: string;
		ipAddress?: string | null | undefined;
		userAgent?: string | null | undefined;
	};
};
export type Account =
	| {
			id: string;
			providerId: string;
			createdAt: Date;
			updatedAt: Date;
			accountId: string;
			scopes: string[];
	  }[]
	| null;
export type twoFactorData = {
	totpURI: string;
	backupCodes: string[];
} | null;
export type NewPropertyBuildType = z.infer<typeof propertyDataSchema>;

export type EditPropertyBuildType = z.infer<typeof patchPropertyDataSchema>;

export type WithId<T> = T & {
	id: string;
};
export type FetchPropertyReturnType = {
	property: EditPropertyBuildType["property"][];
	propertyInfo: EditPropertyBuildType["propertyInfo"][];
	tenant: EditPropertyBuildType["tenant"][];
	lease: EditPropertyBuildType["lease"][];
	loan: EditPropertyBuildType["loan"][];
	transaction: WithId<Transaction>[];
};
