import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import propertiesRouter from "./routes/properties.routes.js";
import { rateLimit } from "express-rate-limit";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.js";
import { errorHandler } from "./middlewares/error-handler.middlewares.js";
import { StatusCodes } from "./constants/status-codes.constants.js";
import { authenticate } from "./middlewares/authenticate.middleware.js";

const app: Express = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PATCH", "DELETE"],
		credentials: true,
	})
);
app.use(express.json({ limit: "5mb" }));

const rateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	limit: 50,
});

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(rateLimiter);

app.get("/api/me", async (req, res) => {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});
	return res.json(session);
});

/**
 * Server health check endpoint: \
 * ensures server is running
 */
app.get("/api/ping", (req: Request, res: Response) => {
	res.status(StatusCodes.SUCCESS).json({ message: "pong" });
});

app.use("/api/properties", authenticate, propertiesRouter);

app.use(errorHandler);

export default app;
