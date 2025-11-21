import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

import PropertyOverview from "@/components/propertyOverview";
import TransactionsTable from "@/components/transactionTable";
import AddTransactionModal from "@/components/modals/addTransactionModal";

import {
  mockProperty,
  mockPropertyInfo,
  mockTenant,
  mockLease,
  mockLoan,
  mockTransactions,
} from "@/lib/mock-data";
import type { Transaction } from "@/lib/types";

export default function PropertyDetailPage() {
  // const { id } = useParams()
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [transactions, setTransactions] = useState(mockTransactions);

  // In a real React app, you'd fetch using the ID from React Router
  const property = mockProperty;
  const propertyInfo = mockPropertyInfo;
  const tenant = mockTenant;
  const lease = mockLease;
  const loan = mockLoan;

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    setIsAddTransactionOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="border-b border-border px-6 py-6">
          <Link to="/properties/dashboard">
            <Button variant="ghost" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Properties
            </Button>
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                {property.address}
              </h1>

              <div className="flex gap-2 flex-wrap">
                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                  {property.purpose.charAt(0).toUpperCase() +
                    property.purpose.slice(1)}
                </span>

                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                  {property.type.charAt(0).toUpperCase() +
                    property.type.slice(1)}
                </span>

                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                  {property.currency}
                </span>

                {property.sold && (
                  <span className="inline-block px-3 py-1 bg-destructive text-destructive-foreground rounded-full text-sm">
                    SOLD
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Current Value</p>
              <p className="text-2xl font-semibold text-foreground">
                {property.currency} {property.currentValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <PropertyOverview
          property={property}
          propertyInfo={propertyInfo}
          tenant={tenant}
          lease={lease}
          loan={loan}
        />

        {/* Transactions Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Transactions
            </h2>

            <Button
              onClick={() => setIsAddTransactionOpen(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          </div>

          <TransactionsTable transactions={transactions} />
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddTransactionOpen}
        onClose={() => setIsAddTransactionOpen(false)}
        onSave={handleAddTransaction}
        propertyId={property.id}
      />
    </div>
  );
}
