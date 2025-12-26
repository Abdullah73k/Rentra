import type { propertyInfoSchema, propertySchema } from "@/lib/schemas";
import type { AddPropertyFormData, Transaction } from "@/lib/types";
import { useAuthStore } from "@/stores/auth.store";
import z from "zod";

export const PROPERTY_PURPOSES = ["personal", "investment"];
export const PROPERTY_TYPES = [
	"house",
	"apartment",
	"villa",
	"penthouse",
	"townhouse",
	"duplex",
	"triplex",
	"studio",
];
export const PROPERTY_STATUS = [
	"available",
	"rented",
	"maintenance",
	"off_market",
	"reserved",
];
export const FURNISHING_TYPES = ["furnished", "semi-furnished", "unfurnished"];
export const LEASE_FREQUENCIES = [
	"weekly",
	"bi-weekly",
	"monthly",
	"bi-monthly",
	"quarterly",
	"annually",
	"bi-annually",
];
export const TRANSACTION_TYPES = ["income", "expense"];

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

export const INITIAL_TRANSACTION_FORM: Transaction = {
	propertyId: "",
	leaseId: undefined,
	type: "income",
	subcategory: "",
	amount: "0",
	currency: "AED",
	taxRate: "0",
	taxAmount: "0",
	fxRateToBase: "1",
	from: "",
	to: "",
	method: "bank_transfer",
	date: "",
	notes: "",
};

export const PAYMENT_METHODS = [
	{ value: "bank_transfer", label: "Bank Transfer" },
	{ value: "cash", label: "Cash" },
	{ value: "check", label: "Check" },
	{ value: "credit_card", label: "Credit Card" },
	{ value: "debit_card", label: "Debit Card" },
];

const session = useAuthStore.getState().session;

export const ADD_PROPERTY_DEFAULT_VALUES: {
	property: z.infer<typeof propertySchema>;
	propertyInfo: z.infer<typeof propertyInfoSchema>;
	optionalSections: {
		addTenant: boolean;
		addLease: boolean;
		addLoan: boolean;
	};
} = {
	property: {
		userId: session?.user.id || "",
		purpose: "personal",
		type: "house",
		address: "",
		country: "",
		currency: "",
		purchasePrice: "0",
		closingCosts: "0",
		acquisitionDate: "",
		currentValue: "0",
		valuationDate: "",
		photos: [],
		sold: false,
	},
	propertyInfo: {
		propertyNumber: "",
		bedrooms: 0,
		bathrooms: "0",
		sizeSqm: "0",
		status: "available",
		furnishing: "furnished",
		parking: "",
		lockerNumbers: [],
		notes: "",
	},
	optionalSections: {
		addTenant: false,
		addLease: false,
		addLoan: false,
	},
};
