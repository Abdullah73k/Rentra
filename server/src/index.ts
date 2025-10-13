import express, { type Request, type Response, type Express } from "express";
import propertiesRouter from "./routes/properties.routes.js";
import { rateLimit } from "express-rate-limit";

const app: Express = express();

const rateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	limit: 50,
});

app.use(rateLimiter);

app.use("/api/properties", propertiesRouter);

app.listen(3000, () => {
	console.log("server running on port 3000");
});

export default app;
