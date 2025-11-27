import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { type PropertyInfo } from "@/lib/types";

const PropertyInfoCard = ({ propertyInfo }: { propertyInfo: PropertyInfo }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Property #</p>
            <p className="font-semibold text-foreground">
              {propertyInfo.propertyNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-semibold capitalize text-foreground">
              {propertyInfo.status.replace(/_/g, " ")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Bedrooms</p>
            <p className="font-semibold text-foreground">
              {propertyInfo.bedrooms}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Bathrooms</p>
            <p className="font-semibold text-foreground">
              {propertyInfo.bathrooms}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Size</p>
            <p className="font-semibold text-foreground">
              {propertyInfo.sizeSqm} m²
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Furnishing</p>
            <p className="font-semibold capitalize text-foreground">
              {propertyInfo.furnishing.replace(/_/g, " ")}
            </p>
          </div>
        </div>
        {propertyInfo.parking && (
          <div className="border-border border-t pt-2">
            <p className="text-sm text-muted-foreground">Parking</p>
            <p className="text-sm text-foreground">{propertyInfo.parking}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyInfoCard;
