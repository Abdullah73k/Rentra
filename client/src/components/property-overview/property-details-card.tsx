import type { NewPropertyBuildType } from "@/lib/types";
import CustomCard from "../custom-card";

const PropertyDetailsCard = ({
	property,
	propertyInfo,
}: {
	property: NewPropertyBuildType["property"];
	propertyInfo: NewPropertyBuildType["propertyInfo"];
}) => {
	return (
		<CustomCard title="Property Details">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<p className="text-sm text-muted-foreground">Purchase Price</p>
					<p className="font-semibold text-foreground">
						{property.currency}
						{Number(property.purchasePrice).toLocaleString()}
					</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Closing Costs</p>
					<p className="font-semibold text-foreground">
						{property.currency} {Number(property.closingCosts).toLocaleString()}
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
		</CustomCard>
	);
};

export default PropertyDetailsCard;
