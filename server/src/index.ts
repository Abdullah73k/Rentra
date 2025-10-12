import express, { type Request, type Response, type Express } from "express"

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
    res.send("server running")
})

app.listen(3000, () => {
    console.log("server running on port 3000")
})

export default app