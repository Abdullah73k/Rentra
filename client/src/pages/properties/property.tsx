import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import TransactionsTable from "@/components/transaction-table";
import AddTransactionModal from "@/components/modals/add-transaction-modal";
import { motion } from "motion/react";
import PropertyOverview from "@/components/property-overview/property-overview";
import watercolorHouse from "@/assets/pictures/watercolorHouse.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyDashboard from "@/components/property-dashboard";
import { useQuery } from "@tanstack/react-query";
import { fetchPropertyInfo } from "@/utils/http";
import EditPropertyModal from "@/components/modals/edit-property-modal";

export default function PropertyDetailPage() {
	const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

	const { propertyId } = useParams();

	if (!propertyId) return <Navigate to="/properties/dashboard" />;

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["property", propertyId],
		queryFn: () => fetchPropertyInfo(propertyId),
	});

	if (isPending) {
		return (
			<div className="flex h-full w-full items-center justify-center py-10">
				<span className="text-muted-foreground">
					Loading property details...
				</span>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="flex h-full w-full items-center justify-center py-10">
				<span className="text-muted-foreground">No property found</span>
			</div>
		);
	}

	const property = data?.property[0];
	const propertyInfo = data?.propertyInfo[0];
	const tenant = data?.tenant[0];
	const lease = data?.lease[0];
	const loan = data?.loan[0];
	let transactions = data?.transaction;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="w-full"
		>
			<div
				aria-hidden="true"
				className="relative min-h-full h-360"
				style={{
					backgroundImage: `url(${watercolorHouse})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			/>
			<div className="absolute inset-0 bg-[#f8f8f8]/40 h-360 w-full">
				{isError && (
					<div
						role="alert"
						aria-live="assertive"
						className="mx-auto w-full px-6 pt-4"
					>
						<p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200 shadow-sm">
							{error.message || "Failed to get property info"}
						</p>
					</div>
				)}
				<div className="mx-auto w-full ">
					{/* Header */}
					<div className="border-b border-border w-full px-6 py-6 bg-[#f8f8f8]">
						<Link to="/properties/dashboard">
							<Button variant="ghost" className="mb-4 gap-2">
								<ArrowLeft className="h-4 w-4" />
								Back to Properties
							</Button>
						</Link>

						<div className="flex items-start justify-between">
							<div>
								<h1 className="text-3xl font-semibold text-foreground mb-2">
									{property?.address}
								</h1>

								<div className="flex gap-2 flex-wrap">
									<span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
										{property?.purpose &&
											property?.purpose.charAt(0).toUpperCase() +
												property?.purpose.slice(1)}
									</span>

									<span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
										{property?.type &&
											property?.type.charAt(0).toUpperCase() +
												property?.type.slice(1)}
									</span>

									<span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
										{property?.currency}
									</span>

									{property?.sold && (
										<span className="inline-block px-3 py-1 bg-destructive text-destructive-foreground rounded-full text-sm">
											SOLD
										</span>
									)}
								</div>
							</div>

							<div className="text-right">
								<p className="text-sm text-muted-foreground">Current Value</p>
								<p className="text-2xl font-semibold text-foreground">
									{property?.currency}{" "}
									{property?.currentValue != null
										? Number(property.currentValue).toLocaleString()
										: ""}{" "}
								</p>
							</div>
						</div>
					</div>

					<div className="px-6 bg-[#f8f8f8] min-h-screen">
						<Tabs defaultValue="info" className="w-full">
							<div className="border-b border-border flex justify-between">
								<TabsList className="bg-transparent h-auto p-0 gap-6 flex-row justify-between">
									<TabsTrigger
										value="info"
										className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 py-3"
									>
										Info
									</TabsTrigger>
									<TabsTrigger
										value="dashboard"
										className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 py-3"
									>
										Dashboard
									</TabsTrigger>
								</TabsList>
								<div className="flex items-center gap-2">
									<Button className="text-black" variant="outline">
										Edit
									</Button>
								</div>
							</div>

							<TabsContent value="info" className="pt-6">
								{/* Overview Section */}
								<PropertyOverview
									property={property!}
									propertyInfo={propertyInfo!}
									tenant={tenant}
									lease={lease}
									loan={loan}
								/>

								{/* Transactions Section */}
								<div className="p-6 ">
									<div className="flex items-center justify-between mb-6 ">
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
							</TabsContent>

							<TabsContent value="dashboard">
								<PropertyDashboard
									property={property!}
									propertyInfo={propertyInfo!}
									loan={loan}
									transactions={transactions}
									lease={lease}
									tenant={tenant}
								/>
							</TabsContent>
						</Tabs>
					</div>
				</div>

				{/* Add Transaction Modal */}
				{propertyId && (
					<AddTransactionModal
						isOpen={isAddTransactionOpen}
						onClose={() => setIsAddTransactionOpen(false)}
						propertyId={propertyId}
					/>
				)}
				<EditPropertyModal property={{
					property,
					propertyInfo,
					tenant,
					lease,
					loan
				}} />
			</div>
		</motion.div>
	);
}
