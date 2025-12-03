import CustomCard from "../CustomCard";
import { type PropertyInfo } from "@/lib/types";

const PropertyInfoCard = ({ propertyInfo }: { propertyInfo: PropertyInfo }) => {
  return (
    <CustomCard title="Property Information">
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
    </CustomCard>
  );
};

export default PropertyInfoCard;
