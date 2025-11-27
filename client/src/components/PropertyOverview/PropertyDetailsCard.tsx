import { Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Property, PropertyInfo } from "@/lib/types";

const PropertyDetailsCard = ({
  property,
  propertyInfo,
}: {
  property: Property;
  propertyInfo: PropertyInfo;
}) => {
  return (
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
  );
};

export default PropertyDetailsCard;
