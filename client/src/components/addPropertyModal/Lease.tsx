import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { LEASE_FREQUENCIES } from "@/constants/form.constants";
import type { AddPropertyFormData } from "@/lib/types";

const Lease = ({
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
            onValueChange={(value) => handleSelectChange("frequency", value)}
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
  );
};

export default Lease;
