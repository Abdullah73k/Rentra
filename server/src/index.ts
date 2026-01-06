import app from "./app.js";

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});

process.on("SIGTERM", () => {
	console.log("server is closing");
	server.close(() => {
		console.log("server closed");
		process.exit(0);
	});
});
