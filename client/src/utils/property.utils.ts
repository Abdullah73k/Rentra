import type { FormFields } from "@/components/modals/add-property-modal";

export function isCompleteLoan(loan: FormFields["loan"]): loan is NonNullable<FormFields["loan"]> {
    return !!loan
        && typeof loan.lender === "string" && loan.lender.length > 0
        && typeof loan.termMonths === "number"
        && typeof loan.monthlyPayment === "number"
        && typeof loan.totalMortgageAmount === "number"
        && typeof loan.interestRate === "number";
}

export function isCompleteTenant(tenant: FormFields["tenant"]): tenant is NonNullable<FormFields["tenant"]> {
    return !!tenant
        && typeof tenant.name === "string" && tenant.name.length > 0
        && typeof tenant.email === "string" && tenant.email.length > 0;
    // phone can stay optional
}

export function isCompleteLease(lease: FormFields["lease"]): lease is NonNullable<FormFields["lease"]> {
    return !!lease
        && !!lease.start
        && !!lease.end
        && typeof lease.rentAmount === "number"
        && !!lease.frequency
        && typeof lease.paymentDay === "number"
        && typeof lease.deposit === "number";
}
