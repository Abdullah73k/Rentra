import express, { type Request, type Response, type Express } from "express"
import propertiesRouter from "./routes/properties.routes.js"

const app: Express = express()

app.use("/api/properties", propertiesRouter)

app.listen(3000, () => {
    console.log("server running on port 3000")
})

export default app