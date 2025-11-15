import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Users, FileText, Banknote, Plus } from "lucide-react"

interface Property {
  currency: string
  purchasePrice: number
  closingCosts: number
  acquisitionDate: string
  valuationDate: string
}

interface PropertyInfo {
  propertyNumber: string
  status: string
  bedrooms: number
  bathrooms: number
  sizeSqm: number
  furnishing: string
  notes?: string
  parking?: string
}

interface Tenant {
  name: string
  phone?: string
  email: string
}

interface Lease {
  start: string
  end: string
  currency: string
  rentAmount: number
  frequency: string
  deposit: number
}

interface Loan {
  lender: string
  termMonths: number
  interestRate: number
  totalMortgageAmount: number
  monthlyPayment: number
}

interface PropertyOverviewProps {
  property: Property
  propertyInfo: PropertyInfo
  tenant?: Tenant
  lease?: Lease
  loan?: Loan
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({
  property,
  propertyInfo,
  tenant,
  lease,
  loan,
}) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Property Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Purchase Price</p>
                <p className="font-semibold text-foreground">
                  {property.currency} {property.purchasePrice.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Closing Costs</p>
                <p className="font-semibold text-foreground">
                  {property.currency} {property.closingCosts.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Acquisition Date</p>
                <p className="font-semibold text-foreground">
                  {new Date(property.acquisitionDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valuation Date</p>
                <p className="font-semibold text-foreground">
                  {new Date(property.valuationDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            {propertyInfo.notes && (
              <div className="border-border border-t pt-2">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="text-sm text-foreground">{propertyInfo.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Property Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Property #</p>
                <p className="font-semibold text-foreground">
                  {propertyInfo.propertyNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold capitalize text-foreground">
                  {propertyInfo.status.replace(/_/g, " ")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bedrooms</p>
                <p className="font-semibold text-foreground">
                  {propertyInfo.bedrooms}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bathrooms</p>
                <p className="font-semibold text-foreground">
                  {propertyInfo.bathrooms}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Size</p>
                <p className="font-semibold text-foreground">
                  {propertyInfo.sizeSqm} m²
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Furnishing</p>
                <p className="font-semibold capitalize text-foreground">
                  {propertyInfo.furnishing.replace(/_/g, " ")}
                </p>
              </div>
            </div>
            {propertyInfo.parking && (
              <div className="border-border border-t pt-2">
                <p className="text-sm text-muted-foreground">Parking</p>
                <p className="text-sm text-foreground">{propertyInfo.parking}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tenant Card */}
        {tenant ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Tenant
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold text-foreground">{tenant.name}</p>
              </div>
              {tenant.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm text-foreground">{tenant.phone}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm text-foreground">{tenant.email}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items
-center gap-2">
                <Users className="h-5 w-5" />
                Tenant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                No tenant added yet
              </p>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                <Plus className="h-4 w-4" />
                Add Tenant
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Lease Card */}
        {lease ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Lease
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(lease.start).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(lease.end).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rent</p>
                <p className="font-semibold text-foreground">
                  {lease.currency} {lease.rentAmount.toLocaleString()}{" "}
                  {lease.frequency}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deposit</p>
                <p className="font-semibold text-foreground">
                  {lease.currency} {lease.deposit.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Lease
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                No lease added yet
              </p>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                <Plus className="h-4 w-4" />
                Add Lease
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loan Card */}
        {loan ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                Loan
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Lender</p>
                <p className="font-semibold text-foreground">{loan.lender}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Term</p>
                  <p className="font-semibold text-foreground">
                    {loan.termMonths} months
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="font-semibold text-foreground">
                    {loan.interestRate}%
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-semibold text-foreground">
                  {loan.totalMortgageAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="font-semibold text-foreground">
                  {loan.monthlyPayment.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                Loan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                No loan added yet
              </p>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                <Plus className="h-4 w-4" />
                Add Loan
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default PropertyOverview
