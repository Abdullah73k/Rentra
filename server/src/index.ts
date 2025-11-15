import dotenv from "dotenv";

dotenv.config();

import express, { type Express } from "express";
import cors from "cors";
import propertiesRouter from "./routes/properties.routes.js";
import { rateLimit } from "express-rate-limit";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.js";
import { errorHandler } from "./middlewares/error-handler.middlewares.js";

const app: Express = express();

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PATCH", "DELETE"],
		credentials: true,
	})
);
app.use(express.json({ limit: "2mb" }));

const rateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	limit: 50,
});

app.use(rateLimiter);

app.get("/api/me", async (req, res) => {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});
	return res.json(session);
});
app.use("/api/properties", propertiesRouter);

app.use(errorHandler);

app.listen(3000, () => {
	console.log("server running on port 3000");
});

export default app;
