import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

const PROPERTY_PURPOSES = ["residential", "commercial", "investment", "vacation"] as const
const PROPERTY_TYPES = ["apartment", "house", "condo", "office", "retail", "land"] as const
const PROPERTY_STATUS = ["available", "rented", "sold", "under_construction"] as const
const FURNISHING_TYPES = ["unfurnished", "semi_furnished", "fully_furnished"] as const
const LEASE_FREQUENCIES = ["monthly", "quarterly", "semi_annual", "annual"] as const
// const TRANSACTION_TYPES = ["income", "expense", "repair", "upgrade", "management"] as const // currently unused but kept

interface AddPropertyModalProps {
  isOpen: boolean
  onClose: () => void
  // keep `any` here so you can wire it to your own Property type / DB schema later
  onSave: (property: any) => void
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({ isOpen, onClose, onSave }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<any>({
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
    // Optional Sections
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
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleSave = () => {
    const propertyId = uuidv4()
    const tenantId = formData.addTenant ? uuidv4() : undefined

    const property = {
      id: propertyId,
      purpose: formData.purpose,
      type: formData.type,
      address: formData.address,
      country: formData.country,
      currency: formData.currency,
      purchasePrice: formData.purchasePrice,
      closingCosts: formData.closingCosts,
      acquisitionDate: formData.acquisitionDate,
      currentValue: formData.currentValue,
      valuationDate: formData.valuationDate,
      sold: formData.sold,
      photos: [],
      createdAt: new Date().toISOString(),
      info: {
        id: uuidv4(),
        propertyId,
        propertyNumber: formData.propertyNumber,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        sizeSqm: formData.sizeSqm,
        status: formData.status,
        furnishing: formData.furnishing,
        parking: formData.parking || undefined,
        notes: formData.notes || undefined,
      },
      tenant: formData.addTenant
        ? {
            id: tenantId,
            propertyId,
            name: formData.tenantName,
            phone: formData.tenantPhone || undefined,
            email: formData.tenantEmail,
            createdAt: new Date().toISOString(),
          }
        : undefined,
      lease: formData.addLease
        ? {
            id: uuidv4(),
            propertyId,
            tenantId,
            start: formData.leaseStart,
            end: formData.leaseEnd,
            rentAmount: formData.rentAmount,
            currency: formData.leaseCurrency,
            frequency: formData.frequency,
            paymentDay: formData.paymentDay,
            deposit: formData.deposit,
            createdAt: new Date().toISOString(),
          }
        : undefined,
      loan: formData.addLoan
        ? {
            id: uuidv4(),
            propertyId,
            lender: formData.lender,
            termMonths: formData.termMonths,
            monthlyPayment: formData.monthlyPayment,
            totalMortgageAmount: formData.totalMortgageAmount,
            interestRate: formData.interestRate,
            createdAt: new Date().toISOString(),
          }
        : undefined,
    }

    onSave(property)
    setStep(1)
    setFormData({
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
      propertyNumber: "",
      bedrooms: 0,
      bathrooms: 0,
      sizeSqm: 0,
      status: "available",
      furnishing: "unfurnished",
      parking: "",
      notes: "",
      addLease: false,
      addTenant: false,
      addLoan: false,
      tenantName: "",
      tenantPhone: "",
      tenantEmail: "",
      leaseStart: "",
      leaseEnd: "",
      rentAmount: 0,
      leaseCurrency: "AED",
      frequency: "monthly",
      paymentDay: 1,
      deposit: 0,
      lender: "",
      termMonths: 0,
      monthlyPayment: 0,
      totalMortgageAmount: 0,
      interestRate: 0,
    })
  }

  const isStep1Valid =
    formData.purpose &&
    formData.type &&
    formData.address &&
    formData.country &&
    formData.acquisitionDate &&
    formData.valuationDate

  const isStep2Valid = formData.propertyNumber && formData.bedrooms !== undefined

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Add Property - Basic Information"}
            {step === 2 && "Add Property - Property Details"}
            {step === 3 && "Add Property - Optional Information"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Step 1: Property */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="purpose">Purpose *</Label>
                  <Select
                    value={formData.purpose}
                    onValueChange={(value) => handleSelectChange("purpose", value)}
                  >
                    <SelectTrigger id="purpose">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_PURPOSES.map((purpose) => (
                        <SelectItem key={purpose} value={purpose}>
                          {purpose.charAt(0).toUpperCase() + purpose.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street, Apt 4B"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="United Arab Emirates"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency *</Label>
                  <Input
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    placeholder="AED"
                    maxLength={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="purchasePrice">Purchase Price *</Label>
                  <Input
                    id="purchasePrice"
                    name="purchasePrice"
                    type="number"
                    value={formData.purchasePrice}
                    onChange={handleInputChange}
                    placeholder="0"
                    min={0}
                  />
                </div>
                <div>
                  <Label htmlFor="closingCosts">Closing Costs *</Label>
                  <Input
                    id="closingCosts"
                    name="closingCosts"
                    type="number"
                    value={formData.closingCosts}
                    onChange={handleInputChange}
                    placeholder="0"
                    min={0}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="acquisitionDate">Acquisition Date *</Label>
                  <Input
                    id="acquisitionDate"
                    name="acquisitionDate"
                    type="date"
                    value={formData.acquisitionDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="valuationDate">Valuation Date *</Label>
                  <Input
                    id="valuationDate"
                    name="valuationDate"
                    type="date"
                    value={formData.valuationDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentValue">Current Value *</Label>
                  <Input
                    id="currentValue"
                    name="currentValue"
                    type="number"
                    value={formData.currentValue}
                    onChange={handleInputChange}
                    placeholder="0"
                    min={0}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: PropertyInfo */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyNumber">Property Number *</Label>
                  <Input
                    id="propertyNumber"
                    name="propertyNumber"
                    value={formData.propertyNumber}
                    onChange={handleInputChange}
                    placeholder="4B"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_STATUS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() +
                            status.slice(1).replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    min={0}
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    min={0}
                    step={0.5}
                  />
                </div>
                <div>
                  <Label htmlFor="sizeSqm">Size (sqm) *</Label>
                  <Input
                    id="sizeSqm"
                    name="sizeSqm"
                    type="number"
                    value={formData.sizeSqm}
                    onChange={handleInputChange}
                    min={0}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="furnishing">Furnishing *</Label>
                <Select
                  value={formData.furnishing}
                  onValueChange={(value) =>
                    handleSelectChange("furnishing", value)
                  }
                >
                  <SelectTrigger id="furnishing">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FURNISHING_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() +
                          type.slice(1).replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="parking">Parking</Label>
                <Input
                  id="parking"
                  name="parking"
                  value={formData.parking}
                  onChange={handleInputChange}
                  placeholder="Covered Parking - Spot B12"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any additional notes about the property..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 3: Optional Sections */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Toggle Sections */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="font-semibold text-foreground">Optional Sections</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="addTenant"
                      checked={formData.addTenant}
                      onChange={() => handleCheckboxChange("addTenant")}
                      className="h-4 w-4"
                    />
                    <label htmlFor="addTenant" className="ml-2 text-sm cursor-pointer">
                      Add Tenant Now?
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="addLease"
                      checked={formData.addLease}
                      onChange={() => handleCheckboxChange("addLease")}
                      className="h-4 w-4"
                    />
                    <label htmlFor="addLease" className="ml-2 text-sm cursor-pointer">
                      Add Lease Now?
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="addLoan"
                      checked={formData.addLoan}
                      onChange={() => handleCheckboxChange("addLoan")}
                      className="h-4 w-4"
                    />
                    <label htmlFor="addLoan" className="ml-2 text-sm cursor-pointer">
                      Add Loan Now?
                    </label>
                  </div>
                </div>
              </div>

              {/* Tenant Form */}
              {formData.addTenant && (
                <div className="space-y-4 border-b pb-6">
                  <h3 className="font-semibold text-foreground">Tenant Information</h3>
                  <div>
                    <Label htmlFor="tenantName">Name *</Label>
                    <Input
                      id="tenantName"
                      name="tenantName"
                      value={formData.tenantName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenantPhone">Phone</Label>
                    <Input
                      id="tenantPhone"
                      name="tenantPhone"
                      value={formData.tenantPhone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenantEmail">Email *</Label>
                    <Input
                      id="tenantEmail"
                      name="tenantEmail"
                      type="email"
                      value={formData.tenantEmail}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              )}

              {/* Lease Form */}
              {formData.addLease && (
                <div className="space-y-4 border-b pb-6">
                  <h3 className="font-semibold text-foreground">Lease Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="leaseStart">Start Date *</Label>
                      <Input
                        id="leaseStart"
                        name="leaseStart"
                        type="date"
                        value={formData.leaseStart}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaseEnd">End Date *</Label>
                      <Input
                        id="leaseEnd"
                        name="leaseEnd"
                        type="date"
                        value={formData.leaseEnd}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rentAmount">Rent Amount *</Label>
                      <Input
                        id="rentAmount"
                        name="rentAmount"
                        type="number"
                        value={formData.rentAmount}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                    <div>
                      <Label htmlFor="frequency">Frequency *</Label>
                      <Select
                        value={formData.frequency}
                        onValueChange={(value) =>
                          handleSelectChange("frequency", value)
                        }
                      >
                        <SelectTrigger id="frequency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LEASE_FREQUENCIES.map((freq) => (
                            <SelectItem key={freq} value={freq}>
                              {freq.charAt(0).toUpperCase() +
                                freq.slice(1).replace(/_/g, " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="paymentDay">Payment Day (1-31) *</Label>
                      <Input
                        id="paymentDay"
                        name="paymentDay"
                        type="number"
                        value={formData.paymentDay}
                        onChange={handleInputChange}
                        min={1}
                        max={31}
                      />
                    </div>
                    <div>
                      <Label htmlFor="deposit">Deposit *</Label>
                      <Input
                        id="deposit"
                        name="deposit"
                        type="number"
                        value={formData.deposit}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Loan Form */}
              {formData.addLoan && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Loan Information</h3>
                  <div>
                    <Label htmlFor="lender">Lender *</Label>
                    <Input
                      id="lender"
                      name="lender"
                      value={formData.lender}
                      onChange={handleInputChange}
                      placeholder="Bank Name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="termMonths">Term (Months) *</Label>
                      <Input
                        id="termMonths"
                        name="termMonths"
                        type="number"
                        value={formData.termMonths}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyPayment">Monthly Payment *</Label>
                      <Input
                        id="monthlyPayment"
                        name="monthlyPayment"
                        type="number"
                        value={formData.monthlyPayment}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="totalMortgageAmount">
                        Total Mortgage Amount *
                      </Label>
                      <Input
                        id="totalMortgageAmount"
                        name="totalMortgageAmount"
                        type="number"
                        value={formData.totalMortgageAmount}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                    <div>
                      <Label htmlFor="interestRate">Interest Rate (%) *</Label>
                      <Input
                        id="interestRate"
                        name="interestRate"
                        type="number"
                        value={formData.interestRate}
                        onChange={handleInputChange}
                        min={0}
                        max={100}
                        step={0.01}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            disabled={step === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex gap-2">
            {step < 3 && (
              <Button
                onClick={() => setStep((prev) => prev + 1)}
                disabled={step === 1 && !isStep1Valid}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
            {step === 3 && (
              <Button onClick={handleSave} disabled={!isStep1Valid || !isStep2Valid}>
                Save Property
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddPropertyModal
