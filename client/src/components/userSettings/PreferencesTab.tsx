import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const PreferencesTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regional & Financial Settings</CardTitle>
          <CardDescription>
            Configure your currency and tax preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="currency"
                className="text-xs font-medium uppercase tracking-wide text-gray-600"
              >
                Currency
              </Label>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="vatRate"
                className="text-xs font-medium uppercase tracking-wide text-gray-600"
              >
                VAT Rate (%)
              </Label>
              <Input
                id="vatRate"
                name="vatRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                placeholder="5"
                className="h-12 rounded-lg border-gray-300 bg-white text-sm disabled:opacity-60"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesTab;
