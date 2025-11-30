import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import type { AddPropertyFormData } from "@/lib/types";

const Tenant = ({
  formData,
  handleInputChange,
}: {
  formData: AddPropertyFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  return (
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
  );
};

export default Tenant;
