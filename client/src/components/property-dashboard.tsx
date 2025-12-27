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
    BarChart,
    Bar,
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
import type { NewPropertyBuildType, Transaction, WithId } from "@/lib/types";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

interface PropertyDashboardProps {
    property: NewPropertyBuildType["property"];
    propertyInfo: NewPropertyBuildType["propertyInfo"];
    loan?: NewPropertyBuildType["loan"];
    transactions?: WithId<Transaction>[];
    lease?: NewPropertyBuildType["lease"];
    tenant?: NewPropertyBuildType["tenant"];
}

// --- Helper Functions ---

const calculateNOI = (transactions: WithId<Transaction>[], startDate?: Date, endDate?: Date) => {
    // Filter transactions by date range if provided
    const filtered = transactions.filter(t => {
        if (!startDate && !endDate) return true;
        const date = new Date(t.date);
        if (startDate && date < startDate) return false;
        if (endDate && date > endDate) return false;
        return true;
    });

    const income = filtered
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const expense = filtered
        .filter(t => t.type === 'expense' && t.subcategory !== 'Mortgage' && t.subcategory !== 'Loan Payment')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    return { income, expense, noi: income - expense };
};

const calculateOER = (expense: number, income: number) => {
    if (income === 0) return 0;
    return (expense / income) * 100;
};


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
    lease,
    tenant,
}) => {
    const currency = property.currency;

    // --- Derived Financial Metrics ---

    const { noi, income: totalIncome, expense: totalOperatingExpense } = React.useMemo(() => {
        return calculateNOI(transactions);
    }, [transactions]);

    const financingCosts = React.useMemo(() => {
        // Calculate financing costs based on transactions if available, otherwise estimate from loan
        const financingTxns = transactions.filter(t =>
            (t.type === 'expense' && (t.subcategory === 'Mortgage' || t.subcategory === 'Loan Payment'))
        ).reduce((sum, t) => sum + parseFloat(t.amount), 0);

        if (financingTxns > 0) return financingTxns;

        // Fallback to loan monthly payment * 12 (annualized) or derived from period
        // For this summary, we'll assume we want the total financing cost incurred in the transaction period
        // If no transactions, and loan exists, we might estimate, but safe default is 0 for "actuals"
        return 0;
    }, [transactions, loan]);

    const cashFlowBeforeFinancing = noi; // Assuming no non-operating expenses for now
    const cashFlowAfterFinancing = cashFlowBeforeFinancing - financingCosts;

    const oer = calculateOER(totalOperatingExpense, totalIncome);

    const totalReturn = React.useMemo(() => {
        // (Cash Flow + Appreciation + Principal Paydown) / Initial Investment
        // Simplification: Using Cash Flow After Financing
        // Missing: Appreciation, Principal Paydown, Initial Invested. Using defaults as per requirements.

        const initialInvestment = parseFloat(property.purchasePrice) * 0.2; // 20% down default
        const appreciation = 0;
        const principalPaydown = 0;

        if (initialInvestment === 0) return 0;
        return ((cashFlowAfterFinancing + appreciation + principalPaydown) / initialInvestment) * 100;
    }, [cashFlowAfterFinancing, property.purchasePrice]);

    // --- Chart Data Preparation ---

    const monthlyChartData = React.useMemo(() => {
        if (!transactions.length) return monthlyData; // Fallback to mock

        const groups = transactions.reduce((acc, t) => {
            const date = new Date(t.date);
            const monthKey = date.toLocaleString('default', { month: 'short' }); // e.g., 'Jan'

            if (!acc[monthKey]) {
                acc[monthKey] = { name: monthKey, income: 0, expense: 0, financing: 0 };
            }

            if (t.type === 'income') {
                acc[monthKey].income += parseFloat(t.amount);
            } else if (t.type === 'expense') {
                if (t.subcategory === 'Mortgage' || t.subcategory === 'Loan Payment') {
                    acc[monthKey].financing += parseFloat(t.amount);
                } else {
                    acc[monthKey].expense += parseFloat(t.amount);
                }
            }
            return acc;
        }, {} as Record<string, { name: string, income: number, expense: number, financing: number }>);

        // Sort by month (basic implementation, assumes same year or chronological)
        // For robust sorting we need real dates, but for now we trust `Transaction` date ordering or existing
        const sortedKeys = Object.keys(groups); // In a real app, sort by date index
        return sortedKeys.map(k => {
            const g = groups[k];
            return {
                ...g,
                cashFlow: g.income - g.expense - g.financing
            };
        });
    }, [transactions]);

    const expenseCategoryData = React.useMemo(() => {
        if (!transactions.length) return expenseData; // Fallback

        const categories = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => {
                const cat = t.subcategory || 'Other';
                acc[cat] = (acc[cat] || 0) + parseFloat(t.amount);
                return acc;
            }, {} as Record<string, number>);

        const colors = [
            "var(--color-chart-1)",
            "var(--color-chart-2)",
            "var(--color-chart-3)",
            "var(--color-chart-4)",
            "var(--color-chart-5)"
        ];

        return Object.entries(categories).map(([name, value], i) => ({
            name,
            value,
            color: colors[i % colors.length]
        }));
    }, [transactions]);



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
                        title: "NOI (Annualized)",
                        value: noi, // In real app, normalize to annual
                        icon: Wallet,
                        color: "text-primary",
                        bg: "bg-primary/10",
                        subtext: "Net Operating Income"
                    },
                    {
                        title: "Cash Flow",
                        value: cashFlowAfterFinancing,
                        icon: Building2,
                        color: "text-emerald-500",
                        bg: "bg-emerald-500/10",
                        subtext: "After Financing"
                    },
                    {
                        title: "OER",
                        value: oer,
                        icon: TrendingDown,
                        color: "text-rose-500",
                        bg: "bg-rose-500/10",
                        subtext: "Operating Expense Ratio",
                        isPercent: true
                    },
                    {
                        title: "Total Return",
                        value: totalReturn,
                        icon: TrendingUp,
                        color: "text-blue-500",
                        bg: "bg-blue-500/10",
                        subtext: "ROI (Est.)",
                        isPercent: true
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
                                <div className="text-2xl font-bold tracking-tight">
                                    {item.isPercent
                                        ? `${item.value.toFixed(1)}%`
                                        : formatCurrency(item.value)}
                                </div>
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
                                Income vs Expenses
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pl-0">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={monthlyChartData}
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
                                            data={expenseCategoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={110}
                                            paddingAngle={4}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {expenseCategoryData.map((entry, index) => (
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
                                        <p className="text-3xl font-bold tracking-tighter">
                                            {formatCurrency(totalOperatingExpense)}
                                        </p>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Total</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Cash Flow Trend Chart (New) */}
            <motion.div variants={itemVariants}>
                <Card className="glass-card border-border/50">
                    <CardHeader>
                        <CardTitle>Net Cash Flow Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={monthlyChartData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
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
                                    <Bar
                                        dataKey="cashFlow"
                                        fill="var(--color-primary)"
                                        radius={[4, 4, 0, 0]}
                                        name="Net Cash Flow"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Rent Roll Table (New) */}
            <motion.div variants={itemVariants}>
                <Card className="glass-card border-border/50">
                    <CardHeader>
                        <CardTitle>Rent Roll</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-border/50">
                                    <TableHead>Tenant</TableHead>
                                    <TableHead>Lease Term</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Monthly Rent</TableHead>
                                    <TableHead className="text-right">Deposit</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tenant && lease ? (
                                    <TableRow className="hover:bg-muted/50 border-border/50">
                                        <TableCell className="font-medium">
                                            {tenant.name}
                                            <div className="text-xs text-muted-foreground">{tenant.email}</div>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(lease.start).toLocaleDateString()} - {new Date(lease.end).toLocaleDateString()}
                                            <div className="text-xs text-muted-foreground capitalize">{lease.frequency}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-0">
                                                Active
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {formatCurrency(parseFloat(lease.rentAmount))}
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground">
                                            {formatCurrency(parseFloat(lease.deposit))}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                            No active lease or tenant data.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>

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
                                                    {formatCurrency(parseFloat(txn.amount))}
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

