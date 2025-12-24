import React from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign } from "lucide-react"
import type { NewPropertyBuildType, WithId } from "@/lib/types"

interface PropertyCardProps {
  property: WithId<NewPropertyBuildType["property"]>
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatCurrency = (value: number | string, currency: string) => {
    return `${currency} ${value.toLocaleString()}`
  }

  return (
    <Card className="overflow-hidden bg-[#f8f8f8] hover:shadow-lg transition-shadow">
      {/* Property Image */}
      {property.photos?.[0] && (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img
            src={property.photos[0] || "/placeholder.svg"}
            alt={property.address}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <CardContent className="p-4">
        {/* Address */}
        <div className="flex gap-2 mb-3">
          <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground">{property.address}</p>
            <p className="text-sm text-muted-foreground">{property.country}</p>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-border">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Purpose</p>
            <p className="text-sm font-medium text-foreground capitalize">{property.purpose}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Type</p>
            <p className="text-sm font-medium text-foreground capitalize">{property.type}</p>
          </div>
        </div>

        {/* Current Value */}
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Value</p>
            <p className="font-semibold text-foreground">
              {formatCurrency(property.currentValue, property.currency)}
            </p>
          </div>
        </div>

        {/* View Button */}
        <Link to={`/properties/${property.id}`}>
          <Button variant="outline" className="w-full bg-transparent">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default PropertyCard
