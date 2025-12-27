import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(5000, () => {
	console.log(`server running on port ${PORT}`);
});
