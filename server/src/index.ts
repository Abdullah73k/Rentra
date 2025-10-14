import express, { type Request, type Response, type Express } from "express"
import propertiesRouter from "./routes/properties.routes.js"
import cors from "cors"

const app: Express = express()

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use("/api/properties", propertiesRouter)

app.listen(3000, () => {
    console.log("server running on port 3000")
})

export default app