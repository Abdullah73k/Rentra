import React, { useState, useMemo, type ChangeEvent } from "react"
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
import { v4 as uuidv4 } from "uuid"

const TRANSACTION_TYPES = ["income", "expense", "repair", "upgrade", "management"] as const

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: any) => void
  propertyId: string
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  propertyId,
}) => {
  const [formData, setFormData] = useState({
    type: "expense",
    subcategory: "",
    amount: 0,
    currency: "AED",
    taxRate: 0,
    from: "",
    to: "",
    method: "bank_transfer",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const taxAmount = useMemo(() => {
    return (formData.amount * formData.taxRate) / 100
  }, [formData.amount, formData.taxRate])

  const handleSave = () => {
    const transaction = {
      id: uuidv4(),
      propertyId,
      type: formData.type,
      subcategory: formData.subcategory,
      amount: formData.amount,
      currency: formData.currency,
      taxRate: formData.taxRate,
      taxAmount,
      fxRateToBase: 1,
      from: formData.from,
      to: formData.to,
      method: formData.method,
      date: formData.date,
      notes: formData.notes || undefined,
      createdAt: new Date().toISOString(),
    }

    onSave(transaction)
    setFormData({
      type: "expense",
      subcategory: "",
      amount: 0,
      currency: "AED",
      taxRate: 0,
      from: "",
      to: "",
      method: "bank_transfer",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    })
  }

  const isValid = formData.subcategory && formData.amount > 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TRANSACTION_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subcategory">Category *</Label>
              <Input
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                placeholder="e.g., Maintenance, Repair"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
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
            <div>
              <Label htmlFor="taxRate">Tax Rate (%) *</Label>
              <Input
                id="taxRate"
                name="taxRate"
                type="number"
                value={formData.taxRate}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                max="100"
                step="0.01"
              />
            </div>
          </div>

          {taxAmount > 0 && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Tax Amount: {formData.currency} {taxAmount.toFixed(2)}
              </p>
              <p className="text-sm font-semibold text-foreground">
                Total: {formData.currency}{" "}
                {(formData.amount + taxAmount).toFixed(2)}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from">From *</Label>
              <Input
                id="from"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                placeholder="e.g., Bank Account"
              />
            </div>
            <div>
              <Label htmlFor="to">To *</Label>
              <Input
                id="to"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                placeholder="e.g., Vendor Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="method">Payment Method *</Label>
              <Select
                value={formData.method}
                onValueChange={(value) => handleSelectChange("method", value)}
              >
                <SelectTrigger id="method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Add any notes..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            Save Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddTransactionModal
