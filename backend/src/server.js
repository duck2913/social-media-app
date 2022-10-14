console.clear()
require("express-async-errors")
require("dotenv").config()

// libraries
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const port = process.env.PORT || 4000
const errorHandler = require("../middlewares/errorHandler")
const authRouter = require("./routers/authRouter")
const usersRouter = require("./routers/usersRoutes")
// middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use("/auth", authRouter)
app.use("/users", usersRouter)

// error handler
app.use(errorHandler)

// start
app.listen(port, () => {
	console.log(`\n-- Server is listening on port ${port} --\n`)
})
