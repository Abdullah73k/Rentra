console.log("Starting import...");
try {
	const mod = await import("./middlewares/authenticate.middleware.js");
	console.log("Import successful!", mod);
} catch (e) {
	console.error("Import failed:", e);
}
