import app from "./app.js";

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});

const gracefulShutdown = () => {
	console.log("server is closing");
	server.close(() => {
		console.log("server closed");
		process.exit(0);
	});
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
