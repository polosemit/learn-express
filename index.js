const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./routes") // new
const dotenv = require('dotenv');
dotenv.config();

console.log(`Your port is ${process.env.DATABASE}`); // 8626
// Connect to MongoDB database
mongoose
	.connect(process.env.DATABASE, { useNewUrlParser: true })
	.then(() => {
		const app = express()
		app.use(express.json()) // new
		app.use("/api", routes) // new

		app.listen(process.env.PORT, () => {
			console.log("Server has started!")
		})
	})
	.catch((error) => {
		console.log("ERROR::", error)
	})