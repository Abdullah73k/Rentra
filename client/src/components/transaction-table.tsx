import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

interface TransactionsTableProps {
  transactions: any[]
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">No transactions yet. Add one to get started.</p>
        </CardContent>
      </Card>
    )
  }

  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  return (
    <Card className="glass-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>From/To</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Tax</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>

                <TableCell className="capitalize">{transaction.type}</TableCell>

                <TableCell>{transaction.subcategory}</TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {transaction.from} → {transaction.to}
                </TableCell>

                <TableCell className="text-right font-medium">
                  {formatCurrency(transaction.amount, transaction.currency)}
                </TableCell>

                <TableCell className="text-right text-sm">
                  {transaction.taxAmount > 0 &&
                    formatCurrency(transaction.taxAmount, transaction.currency)}
                </TableCell>

                <TableCell className="text-right font-semibold">
                  {formatCurrency(
                    transaction.amount + transaction.taxAmount,
                    transaction.currency
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

export default TransactionsTable
