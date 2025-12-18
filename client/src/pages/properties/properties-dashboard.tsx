import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PropertyCard from "@/components/property-card";
import AddPropertyModal from "@/components/modals/add-property-modal";
import { mockProperty, mockPropertyInfo } from "@/lib/mock-data";
import { useAuthStore } from "@/stores/auth.store";

const DashboardPage: React.FC = () => {
  const session = useAuthStore((s) => s.session);
  const isPending = useAuthStore((s) => s.isPending);

  if (!session) return <Navigate to="/auth/login" replace />;

  if (isPending) {
    return null; // TODO: render a spinner or loading screen
  }

  const [properties, setProperties] = useState([
    {
      ...mockProperty,
      info: mockPropertyInfo,
    },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddProperty = (newProperty: any) => {
    setProperties((prev) => [...prev, newProperty]);
    setIsAddModalOpen(false);
  };

  const isEmpty = properties.length === 0;

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-6">
          <h1 className="text-3xl font-semibold text-foreground">Properties</h1>
          <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </div>

        {/* Empty State */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                No properties yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Get started by adding your first property to your portfolio.
              </p>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                size="lg"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Your First Property
              </Button>
            </div>
          </div>
        ) : (
          /* Properties Grid */
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property: any) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProperty}
      />
    </div>
  );
};

export default DashboardPage;
