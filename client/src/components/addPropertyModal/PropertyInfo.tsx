import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { FURNISHING_TYPES, PROPERTY_STATUS } from "@/constants/form.constants";
import { Textarea } from "../ui/textarea";
import type { AddPropertyFormData } from "@/lib/types";

const PropertyInfo = ({
  formData,
  handleSelectChange,
  handleInputChange,
}: {
  formData: AddPropertyFormData;
  handleSelectChange: (name: string, value: string) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  return (
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
          onValueChange={(value) => handleSelectChange("furnishing", value)}
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
  );
};

export default PropertyInfo;
