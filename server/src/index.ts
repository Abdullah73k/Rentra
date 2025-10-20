import express, { type Express } from "express";
import cors from "cors";
import propertiesRouter from "./routes/properties.routes.js";
import { rateLimit } from "express-rate-limit";

const app: Express = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

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
