import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import type { WithId } from "@/lib/types";
import type { Transaction } from "@/lib/types";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";

interface TransactionsTableProps {
  transactions: WithId<Transaction>[] | undefined;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">
            No transactions yet. Add one to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <Card className="glass-card">
      <div className="overflow-x-auto px-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="uppercase">Date</TableHead>
              <TableHead className="uppercase">Type</TableHead>
              <TableHead className="uppercase">Category</TableHead>
              <TableHead className="uppercase">From/To</TableHead>
              <TableHead className="text-right uppercase">Amount</TableHead>
              <TableHead className="text-right uppercase">Tax</TableHead>
              <TableHead className="text-right uppercase">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-gray-100">
                <TableCell className="font-medium">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>

                <TableCell
                  className={`capitalize ${
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.type}
                </TableCell>

                <TableCell>{transaction.subcategory}</TableCell>

                <TableCell className="text-sm">
                  {transaction.from} → {transaction.to}
                </TableCell>

                <TableCell className="text-right font-medium">
                  {formatCurrency(
                    parseFloat(transaction.amount),
                    transaction.currency
                  )}
                </TableCell>

                <TableCell className={`text-sm text-right`}>
                  {parseFloat(transaction.taxAmount) <= 0 && "-"}
                  {parseFloat(transaction.taxAmount) > 0 &&
                    formatCurrency(
                      parseFloat(transaction.taxAmount),
                      transaction.currency
                    )}
                </TableCell>

                <TableCell className="text-right font-semibold">
                  {transaction.type === "expense" ? "-" : ""}
                  {formatCurrency(
                    parseFloat(transaction.amount) +
                      parseFloat(transaction.taxAmount),
                    transaction.currency
                  )}
                </TableCell>
                <TableCell className="w-full text-right font-semibold flex justify-end space-x-4">
                  <Button type="button" variant="outline">
                    <Pencil />
                  </Button>
                  <Button type="button" variant="destructive">
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TransactionsTable;
