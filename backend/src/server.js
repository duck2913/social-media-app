console.clear()
require("dotenv").config()
require("express-async-errors")
// libraries
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const port = process.env.PORT || 4000

const errorHandler = require("../middlewares/errorHandler")
const authRouter = require("./routers/authRouter")
// middleware
app.use(function (_, res, next) {
	res.header("Content-Type", "application/json;charset=UTF-8")
	res.header("Access-Control-Allow-Credentials", true)
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})
app.use(
	cors({
		origin: "*",
		credentials: true, //access-control-allow-credentials:true
		optionSuccessStatus: 200,
	}),
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use("/auth", authRouter)
app.use("/test", (req, res, next) => {
	const token = req.cookies.token
	console.log("🚀 -> file: server.js -> line 35 -> token", token)
})
// error handler
app.use(errorHandler)

// start
app.listen(port, () => {
	console.log(`\n-- Server is listening on port ${port}\n`)
})
