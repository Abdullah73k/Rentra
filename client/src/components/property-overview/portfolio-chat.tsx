import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendAiQuery } from "@/utils/http";
import {
	MessageCircle,
	Send,
	Loader2,
	X,
	Bot,
	User,
	Sparkles,
} from "lucide-react";

type ChatMessage = {
	role: "user" | "assistant";
	content: string;
};

function PortfolioChat() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus();
		}
	}, [isOpen]);

	const { mutate: sendMessage, isPending } = useMutation({
		mutationFn: (message: string) => sendAiQuery(message),
		onMutate: (message) => {
			setMessages((prev) => [...prev, { role: "user", content: message }]);
			setInput("");
		},
		onSuccess: (data) => {
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: data.content },
			]);
		},
		onError: () => {
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content:
						"Sorry, I encountered an error processing your request. Please try again.",
				},
			]);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = input.trim();
		if (!trimmed || isPending) return;
		sendMessage(trimmed);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	const renderMarkdown = (text: string) => {
		const escaped = text
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");

		return escaped
			.replace(
				/```([\s\S]*?)```/g,
				'<pre style="background:rgba(0,0,0,0.05);border-radius:6px;padding:8px;margin:4px 0;font-size:12px;overflow-x:auto"><code>$1</code></pre>',
			)
			.replace(
				/`([^`]+)`/g,
				'<code style="background:rgba(0,0,0,0.05);border-radius:3px;padding:1px 4px;font-size:12px">$1</code>',
			)
			.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
			.replace(/\*(.+?)\*/g, "<em>$1</em>")
			.replace(/\n/g, "<br />");
	};

	// Floating button (closed state)
	if (!isOpen) {
		return (
			<button
				onClick={() => setIsOpen(true)}
				style={{
					position: "fixed",
					bottom: "24px",
					right: "24px",
					zIndex: 9999,
					width: "56px",
					height: "56px",
					borderRadius: "50%",
					backgroundColor: "hsl(var(--primary))",
					color: "hsl(var(--primary-foreground))",
					border: "none",
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
				}}
				aria-label="Open AI Document Chat"
			>
				<MessageCircle style={{ width: "24px", height: "24px" }} />
			</button>
		);
	}

	// Chat panel (open state)
	return (
		<div
			style={{
				position: "fixed",
				bottom: "24px",
				right: "24px",
				zIndex: 9999,
				width: "400px",
				height: "560px",
				borderRadius: "12px",
				border: "1px solid hsl(var(--border) / 0.5)",
				backgroundColor: "hsl(var(--card) / 0.85)",
				backdropFilter: "blur(20px)",
				WebkitBackdropFilter: "blur(20px)",
				color: "hsl(var(--card-foreground))",
				boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}
		>
			{/* Header */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "12px 16px",
					borderBottom: "1px solid hsl(var(--border))",
					flexShrink: 0,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<div
						style={{
							backgroundColor: "hsl(var(--primary) / 0.1)",
							padding: "6px",
							borderRadius: "8px",
						}}
					>
						<Sparkles
							style={{
								width: "16px",
								height: "16px",
								color: "hsl(var(--primary))",
							}}
						/>
					</div>
					<div>
						<div style={{ fontSize: "14px", fontWeight: 600 }}>
							Portfolio AI
						</div>
						<div
							style={{
								fontSize: "11px",
								color: "hsl(var(--muted-foreground))",
							}}
						>
							Ask about your documents
						</div>
					</div>
				</div>
				<button
					onClick={() => setIsOpen(false)}
					style={{
						width: "32px",
						height: "32px",
						borderRadius: "50%",
						border: "none",
						backgroundColor: "transparent",
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "hsl(var(--muted-foreground))",
					}}
				>
					<X style={{ width: "16px", height: "16px" }} />
				</button>
			</div>

			{/* Messages area */}
			<div
				style={{
					flex: 1,
					overflowY: "auto",
					padding: "16px",
					display: "flex",
					flexDirection: "column",
					gap: "12px",
				}}
			>
				{messages.length === 0 && (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							height: "100%",
							textAlign: "center",
							gap: "12px",
							color: "hsl(var(--muted-foreground))",
						}}
					>
						<div
							style={{
								backgroundColor: "hsl(var(--primary) / 0.1)",
								padding: "16px",
								borderRadius: "50%",
							}}
						>
							<Bot
								style={{
									width: "32px",
									height: "32px",
									color: "hsl(var(--primary))",
								}}
							/>
						</div>
						<div>
							<p
								style={{
									fontWeight: 500,
									fontSize: "14px",
									color: "hsl(var(--foreground))",
									margin: 0,
								}}
							>
								Portfolio AI Assistant
							</p>
							<p
								style={{
									fontSize: "12px",
									marginTop: "4px",
									maxWidth: "280px",
								}}
							>
								Ask questions about your uploaded documents — leases, tenant
								IDs, rent receipts, and more.
							</p>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "6px",
								marginTop: "8px",
								width: "100%",
								maxWidth: "280px",
							}}
						>
							{[
								"What is the rent for my property?",
								"When does the lease expire?",
								"Summarize my tenant documents",
							].map((suggestion) => (
								<button
									key={suggestion}
									onClick={() => {
										setInput(suggestion);
										inputRef.current?.focus();
									}}
									style={{
										fontSize: "12px",
										textAlign: "left",
										padding: "8px 12px",
										borderRadius: "8px",
										border: "1px solid hsl(var(--border))",
										backgroundColor: "hsl(var(--card))",
										cursor: "pointer",
										color: "inherit",
									}}
								>
									{suggestion}
								</button>
							))}
						</div>
					</div>
				)}

				{messages.map((msg, idx) => (
					<div
						key={idx}
						style={{
							display: "flex",
							gap: "8px",
							justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
						}}
					>
						{msg.role === "assistant" && (
							<div
								style={{
									backgroundColor: "hsl(var(--primary) / 0.1)",
									padding: "6px",
									borderRadius: "50%",
									width: "28px",
									height: "28px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0,
								}}
							>
								<Bot
									style={{
										width: "14px",
										height: "14px",
										color: "hsl(var(--primary))",
									}}
								/>
							</div>
						)}
						<div
							style={{
								maxWidth: "80%",
								borderRadius: "12px",
								padding: "8px 12px",
								fontSize: "13px",
								lineHeight: "1.5",
								...(msg.role === "user"
									? {
											backgroundColor: "hsl(var(--primary))",
											color: "hsl(var(--primary-foreground))",
											borderBottomRightRadius: "4px",
										}
									: {
											backgroundColor: "hsl(var(--muted))",
											borderBottomLeftRadius: "4px",
										}),
							}}
						>
							{msg.role === "assistant" ? (
								<div
									dangerouslySetInnerHTML={{
										__html: renderMarkdown(msg.content),
									}}
								/>
							) : (
								<p
									style={{
										margin: 0,
										whiteSpace: "pre-wrap",
									}}
								>
									{msg.content}
								</p>
							)}
						</div>
						{msg.role === "user" && (
							<div
								style={{
									backgroundColor: "hsl(var(--primary) / 0.1)",
									padding: "6px",
									borderRadius: "50%",
									width: "28px",
									height: "28px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0,
								}}
							>
								<User
									style={{
										width: "14px",
										height: "14px",
										color: "hsl(var(--primary))",
									}}
								/>
							</div>
						)}
					</div>
				))}

				{isPending && (
					<div
						style={{
							display: "flex",
							gap: "8px",
							justifyContent: "flex-start",
						}}
					>
						<div
							style={{
								backgroundColor: "hsl(var(--primary) / 0.1)",
								padding: "6px",
								borderRadius: "50%",
								width: "28px",
								height: "28px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexShrink: 0,
							}}
						>
							<Bot
								style={{
									width: "14px",
									height: "14px",
									color: "hsl(var(--primary))",
								}}
							/>
						</div>
						<div
							style={{
								backgroundColor: "hsl(var(--muted))",
								borderRadius: "12px",
								borderBottomLeftRadius: "4px",
								padding: "8px 12px",
								display: "flex",
								alignItems: "center",
								gap: "6px",
							}}
						>
							<Loader2
								style={{
									width: "14px",
									height: "14px",
									color: "hsl(var(--muted-foreground))",
									animation: "spin 1s linear infinite",
								}}
							/>
							<span
								style={{
									fontSize: "12px",
									color: "hsl(var(--muted-foreground))",
								}}
							>
								Reading your documents...
							</span>
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* Input area */}
			<div
				style={{
					borderTop: "1px solid hsl(var(--border))",
					padding: "12px",
					flexShrink: 0,
				}}
			>
				<form
					onSubmit={handleSubmit}
					style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}
				>
					<textarea
						ref={inputRef}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Ask about your documents..."
						rows={1}
						disabled={isPending}
						style={{
							flex: 1,
							resize: "none",
							borderRadius: "8px",
							border: "1px solid hsl(var(--border))",
							backgroundColor: "hsl(var(--background))",
							padding: "8px 12px",
							fontSize: "13px",
							minHeight: "38px",
							maxHeight: "100px",
							outline: "none",
							fontFamily: "inherit",
							color: "inherit",
						}}
					/>
					<button
						type="submit"
						disabled={isPending || !input.trim()}
						style={{
							width: "38px",
							height: "38px",
							borderRadius: "8px",
							border: "none",
							backgroundColor:
								isPending || !input.trim()
									? "hsl(var(--muted))"
									: "hsl(var(--primary))",
							color:
								isPending || !input.trim()
									? "hsl(var(--muted-foreground))"
									: "hsl(var(--primary-foreground))",
							cursor: isPending || !input.trim() ? "not-allowed" : "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexShrink: 0,
						}}
					>
						{isPending ? (
							<Loader2
								style={{
									width: "16px",
									height: "16px",
									animation: "spin 1s linear infinite",
								}}
							/>
						) : (
							<Send style={{ width: "16px", height: "16px" }} />
						)}
					</button>
				</form>
				<p
					style={{
						fontSize: "10px",
						color: "hsl(var(--muted-foreground))",
						textAlign: "center",
						marginTop: "6px",
					}}
				>
					AI responses are based on your uploaded documents
				</p>
			</div>
		</div>
	);
}

export default PortfolioChat;
