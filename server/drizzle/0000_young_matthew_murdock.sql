CREATE TYPE "public"."documentType" AS ENUM('photo', 'document');--> statement-breakpoint
CREATE TYPE "public"."PropertyPurpose" AS ENUM('personal', 'investment');--> statement-breakpoint
CREATE TYPE "public"."PropertyType" AS ENUM('house', 'apartment', 'villa', 'penthouse', 'townhouse', 'duplex', 'triplex', 'studio');--> statement-breakpoint
CREATE TYPE "public"."Furnishing" AS ENUM('furnished', 'semi-furnished', 'unfurnished');--> statement-breakpoint
CREATE TYPE "public"."PropertyStatus" AS ENUM('available', 'rented', 'maintenance', 'off_market', 'reserved');--> statement-breakpoint
CREATE TYPE "public"."Frequency" AS ENUM('weekly', 'bi-weekly', 'monthly', 'bi-monthly', 'quarterly', 'annually', 'bi-annually');--> statement-breakpoint
CREATE TYPE "public"."TransactionMethod" AS ENUM('bank_transfer', 'cash', 'check', 'credit_card', 'debit_card');--> statement-breakpoint
CREATE TYPE "public"."TransactionType" AS ENUM('expense', 'income');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL
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
	"createdAt" timestamp,
	"aaguid" text
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "twoFactor" (
	"id" text PRIMARY KEY NOT NULL,
	"secret" text NOT NULL,
	"backupCodes" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"image" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"twoFactorEnabled" boolean DEFAULT false,
	"country" text NOT NULL,
	"currency" text NOT NULL,
	"vatProfile" integer NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Documents" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"propertyId" uuid,
	"tenantId" uuid,
	"leaseId" uuid,
	"loanId" uuid,
	"name" text NOT NULL,
	"type" "documentType" NOT NULL,
	"contentType" text NOT NULL,
	"sizeBytes" integer NOT NULL,
	"path" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Documents_exactly_one_owner_check" CHECK (
			"Documents"."propertyId" IS NOT NULL 
			AND
			num_nonnulls("Documents"."tenantId", "Documents"."leaseId", "Documents"."loanId") <= 1
			)
);
--> statement-breakpoint
CREATE TABLE "Property" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
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
	"sold" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
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
	"lockerNumbers" text[] DEFAULT '{}'::text[] NOT NULL,
	"notes" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "PropertyInfo_propertyId_propertyNumber_unique" UNIQUE("propertyId","propertyNumber"),
	CONSTRAINT "PropertyInfo_bedrooms_check" CHECK ("PropertyInfo"."bedrooms" >= 0),
	CONSTRAINT "PropertyInfo_bathrooms_check" CHECK ("PropertyInfo"."bathrooms" >= 0),
	CONSTRAINT "PropertyInfo_sizeSqm_check" CHECK ("PropertyInfo"."sizeSqm" >= 0)
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
	CONSTRAINT "Lease_paymentDay_check" CHECK ("Lease"."paymentDay" BETWEEN 1 AND 31),
	CONSTRAINT "Lease_end_gte_start_check" CHECK ("Lease"."end" IS NULL OR "Lease"."end" >= "Lease"."start")
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
	CONSTRAINT "Loan_termMonths_check" CHECK ("Loan"."termMonths" >= 0),
	CONSTRAINT "Loan_monthlyPayment_check" CHECK ("Loan"."monthlyPayment" >= 0),
	CONSTRAINT "Loan_totalMortgageAmount_check" CHECK ("Loan"."totalMortgageAmount" >= 0),
	CONSTRAINT "Loan_interestRate_check" CHECK ("Loan"."interestRate" >= 0 AND "Loan"."interestRate" <= 100)
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
	CONSTRAINT "Transaction_amount_check" CHECK ("Transaction"."amount" >= 0),
	CONSTRAINT "Transaction_taxRate_check" CHECK ("Transaction"."taxRate" >= 0 AND "Transaction"."taxRate" <= 100),
	CONSTRAINT "Transaction_taxAmount_check" CHECK ("Transaction"."taxAmount" >= 0),
	CONSTRAINT "Transaction_fxRateToBase_check" CHECK ("Transaction"."fxRateToBase" > 0)
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "passkey" ADD CONSTRAINT "passkey_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "twoFactor" ADD CONSTRAINT "twoFactor_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_propertyId_Property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_tenantId_Tenant_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_leaseId_Lease_id_fk" FOREIGN KEY ("leaseId") REFERENCES "public"."Lease"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_loanId_Loan_id_fk" FOREIGN KEY ("loanId") REFERENCES "public"."Loan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Property" ADD CONSTRAINT "Property_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PropertyInfo" ADD CONSTRAINT "PropertyInfo_propertyId_Property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Lease" ADD CONSTRAINT "Lease_propertyId_Property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Lease" ADD CONSTRAINT "Lease_tenantId_Tenant_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_propertyId_Property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_propertyId_Property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_propertyId_Property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_leaseId_Lease_id_fk" FOREIGN KEY ("leaseId") REFERENCES "public"."Lease"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");