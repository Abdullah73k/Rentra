import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wallet, Building2, TrendingDown, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { Property, PropertyInfo, Loan, Transaction } from "@/lib/types";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

interface PropertyDashboardProps {
    property: Property;
    propertyInfo: PropertyInfo;
    loan?: Loan;
    transactions?: Transaction[];
}

// Mock data
const monthlyData = [
    { name: "Jan", income: 6500, expense: 450, saving: 6050 },
    { name: "Feb", income: 6500, expense: 1200, saving: 5300 },
    { name: "Mar", income: 6500, expense: 450, saving: 6050 },
    { name: "Apr", income: 6500, expense: 450, saving: 6050 },
    { name: "May", income: 6500, expense: 2500, saving: 4000 },
    { name: "Jun", income: 6500, expense: 450, saving: 6050 },
    { name: "Jul", income: 6500, expense: 450, saving: 6050 },
];

const expenseData = [
    { name: "Maintenance", value: 3500, color: "var(--color-chart-1)" },
    { name: "Utilities", value: 1200, color: "var(--color-chart-2)" },
    { name: "Tax", value: 800, color: "var(--color-chart-3)" },
    { name: "Insurance", value: 1500, color: "var(--color-chart-4)" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card px-4 py-3 rounded-xl border border-border/50 shadow-xl">
                <p className="font-medium text-foreground mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm mb-1">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-muted-foreground capitalize">{entry.name}:</span>
                        <span className="font-semibold text-foreground">
                            ${entry.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const PropertyDashboard: React.FC<PropertyDashboardProps> = ({
    property,
    loan,
    transactions = [],
}) => {
    const currency = property.currency;

    const loanBalance = loan ? loan.totalMortgageAmount : 0;
    const equity = property.currentValue - loanBalance;
    const loanToValue = loan ? (loanBalance / property.currentValue) * 100 : 0;

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 0,
        }).format(val);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <motion.div
            className="space-y-6 pt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    {
                        title: "Total Equity",
                        value: equity,
                        icon: Wallet,
                        color: "text-primary",
                        bg: "bg-primary/10",
                        subtext: `${(100 - loanToValue).toFixed(1)}% ownership`
                    },
                    {
                        title: "Current Value",
                        value: property.currentValue,
                        icon: Building2,
                        color: "text-emerald-500",
                        bg: "bg-emerald-500/10",
                        subtext: `Valuation: ${property.valuationDate}`
                    },
                    {
                        title: "Outstanding Loan",
                        value: loanBalance,
                        icon: TrendingDown,
                        color: "text-rose-500",
                        bg: "bg-rose-500/10",
                        subtext: loan ? `${loan.interestRate}% Interest Rate` : "No active loan"
                    },
                    {
                        title: "YTD Net Income",
                        value: 45300,
                        icon: TrendingUp,
                        color: "text-blue-500",
                        bg: "bg-blue-500/10",
                        subtext: "+12.5% vs last year"
                    }
                ].map((item, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <Card className="glass-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-md group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                    {item.title}
                                </CardTitle>
                                <div className={cn("p-2 rounded-full transition-transform group-hover:scale-110", item.bg)}>
                                    <item.icon className={cn("h-4 w-4", item.color)} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold tracking-tight">{formatCurrency(item.value)}</div>
                                <p className="text-xs text-muted-foreground mt-1 font-medium">
                                    {item.subtext}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
                {/* Main Chart */}
                <motion.div className="col-span-1 lg:col-span-4" variants={itemVariants}>
                    <Card className="glass-card border-border/50 h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Cash Flow Trends
                                <Badge variant="outline" className="ml-auto font-normal text-xs bg-background/50">
                                    Last 6 Months
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pl-0">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={monthlyData}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-destructive)" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="var(--color-destructive)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.4} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="var(--color-muted-foreground)"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={10}
                                        />
                                        <YAxis
                                            stroke="var(--color-muted-foreground)"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `$${value}`}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="income"
                                            stroke="var(--color-primary)"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorIncome)"
                                            name="Income"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="expense"
                                            stroke="var(--color-destructive)"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorExpense)"
                                            name="Expenses"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Breakdown Chart */}
                <motion.div className="col-span-1 lg:col-span-3" variants={itemVariants}>
                    <Card className="glass-card border-border/50 h-full">
                        <CardHeader>
                            <CardTitle>Expense Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={expenseData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={110}
                                            paddingAngle={4}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {expenseData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            iconType="circle"
                                            formatter={(value) => <span className="text-sm font-medium text-foreground ml-1">{value}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Center text for donut chart */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold tracking-tighter">$7,000</p>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Total</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Recent Transactions Table */}
            <motion.div variants={itemVariants}>
                <Card className="glass-card border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Activity</CardTitle>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">View All</Badge>
                    </CardHeader>
                    <CardContent>
                        {transactions.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-border/50">
                                        <TableHead className="font-medium">Date</TableHead>
                                        <TableHead className="font-medium">Type</TableHead>
                                        <TableHead className="font-medium">Description</TableHead>
                                        <TableHead className="text-right font-medium">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.slice(0, 5).map((txn) => (
                                        <TableRow key={txn.id} className="hover:bg-muted/50 border-border/50 transition-colors cursor-pointer group">
                                            <TableCell className="text-muted-foreground group-hover:text-foreground transition-colors">
                                                {new Date(txn.date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "capitalize font-medium border-0",
                                                        txn.type === "income"
                                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                                    )}
                                                >
                                                    {txn.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">{txn.notes || txn.subcategory}</TableCell>
                                            <TableCell className="text-right">
                                                <div className={cn(
                                                    "flex items-center justify-end gap-1 font-semibold",
                                                    txn.type === "income" ? "text-emerald-500" : "text-rose-500"
                                                )}>
                                                    {txn.type === "income" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                                    {formatCurrency(txn.amount)}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="p-4 rounded-full bg-muted mb-4">
                                    <Wallet className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="font-semibold text-lg">No recent activity</h3>
                                <p className="text-muted-foreground max-w-sm">No transactions have been recorded for this property yet.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default PropertyDashboard;

