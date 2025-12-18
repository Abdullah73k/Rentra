import { FURNISHING_TYPES, PROPERTY_STATUS } from "@/constants/form.constants";
import TextInput from "../form/text-input";
import type { UseFormReturn } from "react-hook-form";
import type { FormFields } from "../modals/add-property-modal";
import SelectField from "../form/select-field";
import NotesInput from "../form/notes-input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type PropertyInfoProps = {
  form: UseFormReturn<FormFields>;
};

const PropertyInfo = ({ form }: PropertyInfoProps) => {
  const [currentLockerNum, setCurrentLockerNum] = useState("");
  const [LockerNumArray, setLockerNumArray] = useState<string[]>([]);

  useEffect(() => {
    form.setValue("propertyInfo.lockerNumber", LockerNumArray)
  }, [LockerNumArray, form])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          form={form}
          name="propertyInfo.propertyNumber"
          label="Property Number *"
          placeholder="4B"
        />
        <SelectField
          form={form}
          name="propertyInfo.status"
          label="Status *"
          options={PROPERTY_STATUS}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TextInput
          form={form}
          name="propertyInfo.bedrooms"
          label="Bedrooms *"
          type="number"
        />
        <TextInput
          form={form}
          name="propertyInfo.bathrooms"
          label="Bathrooms *"
          type="number"
        />
        <TextInput
          form={form}
          name="propertyInfo.sizeSqm"
          label="Size (sqm) *"
          type="number"
        />
      </div>
      <SelectField
        form={form}
        name="propertyInfo.furnished"
        label="Furnishing *"
        options={FURNISHING_TYPES}
      />

      <TextInput
        form={form}
        name="propertyInfo.parking"
        label="Parking"
        placeholder="Covered Parking - Spot B12"
      />

      {/* --- STYLED LOCKER SECTION START --- */}
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Locker Number(s)
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4 space-y-4">
            {/* Input Group */}
            <div className="flex w-full items-center gap-2">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={currentLockerNum}
                onChange={(e) => {
                  setCurrentLockerNum(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if(currentLockerNum) {
                        setLockerNumArray((prev) => [...prev, currentLockerNum]);
                        setCurrentLockerNum("");
                    }
                  }
                }}
                placeholder="Type locker number..."
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (!currentLockerNum) return;
                  setLockerNumArray((prev) => [...prev, currentLockerNum]);
                  setCurrentLockerNum(""); // Optional UX improvement: clear input after add
                }}
              >
                Add
              </Button>
            </div>

            {/* Tags Display Area */}
            {LockerNumArray.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                {LockerNumArray.map((lockerNum, index) => (
                  <div
                    key={lockerNum}
                    className="inline-flex items-center gap-2 rounded-full border border-transparent bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
                  >
                    <span>{lockerNum}</span>
                    <button
                      type="button"
                      className="ml-1 rounded-full p-0.5 hover:bg-destructive/20 hover:text-destructive focus:outline-none"
                      onClick={() => {
                        setLockerNumArray((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      {/* Simple X icon using text to avoid new imports */}
                      <span className="sr-only">Remove</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {LockerNumArray.length === 0 && (
                <p className="text-[0.8rem] text-muted-foreground italic">
                    No lockers added yet.
                </p>
            )}
          </div>
        </div>
      </div>

      <NotesInput form={form} name="propertyInfo.notes" />
    </div>
  );
};

export default PropertyInfo;