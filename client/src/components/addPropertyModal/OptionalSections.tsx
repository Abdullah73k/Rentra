import type { AddPropertyFormData } from "@/lib/types";
import Lease from "./Lease";
import Loan from "./Loan";
import Tenant from "./Tenant";

const OptionalSections = ({
  formData,
  handleSelectChange,
  handleInputChange,
  handleCheckboxChange,
}: {
  formData: AddPropertyFormData;
  handleSelectChange: (name: string, value: string) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCheckboxChange: (name: string) => void;
}) => {
  return (
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
        <Tenant formData={formData} handleInputChange={handleInputChange} />
      )}

      {/* Lease Form */}
      {formData.addLease && (
        <Lease
          formData={formData}
          handleSelectChange={handleSelectChange}
          handleInputChange={handleInputChange}
        />
      )}

      {/* Loan Form */}
      {formData.addLoan && (
        <Loan formData={formData} handleInputChange={handleInputChange} />
      )}
    </div>
  );
};

export default OptionalSections;
