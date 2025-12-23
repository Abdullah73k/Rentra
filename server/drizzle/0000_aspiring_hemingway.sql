-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."Frequency" AS ENUM('weekly', 'bi-weekly', 'monthly', 'bi-monthly', 'quarterly', 'annually', 'bi-annually');--> statement-breakpoint
CREATE TYPE "public"."Furnishing" AS ENUM('furnished', 'semi-furnished', 'unfurnished');--> statement-breakpoint
CREATE TYPE "public"."PropertyPurpose" AS ENUM('personal', 'investment');--> statement-breakpoint
CREATE TYPE "public"."PropertyStatus" AS ENUM('available', 'rented', 'maintenance', 'off_market', 'reserved');--> statement-breakpoint
CREATE TYPE "public"."PropertyType" AS ENUM('house', 'apartment', 'villa', 'penthouse', 'townhouse', 'duplex', 'triplex', 'studio');--> statement-breakpoint
CREATE TYPE "public"."TransactionMethod" AS ENUM('bank_transfer', 'cash', 'check', 'credit_card', 'debit_card');--> statement-breakpoint
CREATE TYPE "public"."TransactionType" AS ENUM('expense', 'income');--> statement-breakpoint
CREATE TYPE "public"."TransactionTypes" AS ENUM('expense', 'income');--> statement-breakpoint
CREATE TABLE "Property" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"purpose" "PropertyPurpose" NOT NULL,
	"type" "PropertyType" NOT NULL,
	"address" text NOT NULL,
	"country" text NOT NULL,
	"currency" char(3) NOT NULL,
	"purchasePrice" numeric(12, 2) NOT NULL,
	"closingCosts" numeric(12, 2) NOT NULL,
	"acquisitionDate" date NOT NULL,
	"currentValue" numeric(12, 2) NOT NULL,
	"valuationDate" date NOT NULL,
	"photos" text[] DEFAULT '{""}' NOT NULL,
	"sold" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "PropertyInfo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid NOT NULL,
	"propertyNumber" text NOT NULL,
	"bedrooms" smallint NOT NULL,
	"bathrooms" numeric(3, 1) NOT NULL,
	"sizeSqm" numeric(8, 2) NOT NULL,
	"status" "PropertyStatus" DEFAULT 'available' NOT NULL,
	"furnishing" "Furnishing" NOT NULL,
	"parking" text,
	"lockerNumbers" text[] DEFAULT '{""}' NOT NULL,
	"notes" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "PropertyInfo_propertyId_propertyNumber_key" UNIQUE("propertyId","propertyNumber"),
	CONSTRAINT "PropertyInfo_bathrooms_check" CHECK (bathrooms >= (0)::numeric),
	CONSTRAINT "PropertyInfo_bedrooms_check" CHECK (bedrooms >= 0),
	CONSTRAINT "PropertyInfo_sizeSqm_check" CHECK ("sizeSqm" >= (0)::numeric)
);
--> statement-breakpoint
CREATE TABLE "Loan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid NOT NULL,
	"lender" text NOT NULL,
	"termMonths" smallint NOT NULL,
	"monthlyPayment" numeric(10, 2) NOT NULL,
	"totalMortgageAmount" numeric(12, 2) NOT NULL,
	"interestRate" numeric(5, 2) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Loan_interestRate_check" CHECK (("interestRate" >= (0)::numeric) AND ("interestRate" <= (100)::numeric)),
	CONSTRAINT "Loan_monthlyPayment_check" CHECK ("monthlyPayment" >= (0)::numeric),
	CONSTRAINT "Loan_termMonths_check" CHECK ("termMonths" >= 0),
	CONSTRAINT "Loan_totalMortgageAmount_check" CHECK ("totalMortgageAmount" >= (0)::numeric)
);
--> statement-breakpoint
CREATE TABLE "Tenant" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"phone" varchar(50),
	"email" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid,
	"tenantId" uuid,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Documents_check" CHECK ((("propertyId" IS NOT NULL) AND ("tenantId" IS NULL)) OR (("propertyId" IS NULL) AND ("tenantId" IS NOT NULL)))
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"twoFactorEnabled" boolean,
	"country" text NOT NULL,
	"currency" text NOT NULL,
	"vatProfile" integer NOT NULL,
	CONSTRAINT "user_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	CONSTRAINT "session_token_key" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "Lease" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid NOT NULL,
	"tenantId" uuid NOT NULL,
	"start" date NOT NULL,
	"end" date NOT NULL,
	"rentAmount" numeric(10, 2) NOT NULL,
	"currency" char(3) NOT NULL,
	"frequency" "Frequency" NOT NULL,
	"paymentDay" smallint NOT NULL,
	"deposit" numeric(10, 2) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Lease_check" CHECK (("end" IS NULL) OR ("end" >= start)),
	CONSTRAINT "Lease_paymentDay_check" CHECK (("paymentDay" >= 1) AND ("paymentDay" <= 31))
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp with time zone,
	"refreshTokenExpiresAt" timestamp with time zone,
	"scope" text,
	"password" text,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid NOT NULL,
	"leaseId" uuid,
	"type" "TransactionType" NOT NULL,
	"subcategory" text,
	"amount" numeric(10, 2) NOT NULL,
	"currency" char(3) NOT NULL,
	"taxRate" numeric(5, 2) NOT NULL,
	"taxAmount" numeric(10, 2) NOT NULL,
	"fxRateToBase" numeric(10, 6) NOT NULL,
	"from" text NOT NULL,
	"to" text NOT NULL,
	"method" "TransactionMethod" NOT NULL,
	"date" date NOT NULL,
	"notes" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Transaction_amount_check" CHECK (amount >= (0)::numeric),
	CONSTRAINT "Transaction_fxRateToBase_check" CHECK ("fxRateToBase" > (0)::numeric),
	CONSTRAINT "Transaction_taxAmount_check" CHECK ("taxAmount" >= (0)::numeric),
	CONSTRAINT "Transaction_taxRate_check" CHECK (("taxRate" >= (0)::numeric) AND ("taxRate" <= (100)::numeric))
);
--> statement-breakpoint
CREATE TABLE "passkey" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"publicKey" text NOT NULL,
	"userId" text NOT NULL,
	"credentialID" text NOT NULL,
	"counter" integer NOT NULL,
	"deviceType" text NOT NULL,
	"backedUp" boolean NOT NULL,
	"transports" text,
	"createdAt" timestamp with time zone,
	"aaguid" text
);
--> statement-breakpoint
CREATE TABLE "twoFactor" (
	"id" text PRIMARY KEY NOT NULL,
	"secret" text NOT NULL,
	"backupCodes" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Property" ADD CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PropertyInfo" ADD CONSTRAINT "PropertyInfo_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Lease" ADD CONSTRAINT "Lease_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Lease" ADD CONSTRAINT "Lease_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "public"."Lease"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "passkey" ADD CONSTRAINT "passkey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "twoFactor" ADD CONSTRAINT "twoFactor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
*/