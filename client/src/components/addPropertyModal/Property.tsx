import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Input } from "../ui/input";
import { PROPERTY_PURPOSES, PROPERTY_TYPES } from "@/constants/form.constants";
import type { AddPropertyFormData } from "@/lib/types";

const Property = ({
  formData,
  handleSelectChange,
  handleInputChange,
}: {
  formData: AddPropertyFormData;
  handleSelectChange: (name: string, value: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}) => {
  return (
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
  );
};

export default Property;
