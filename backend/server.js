console.clear()
require("express-async-errors")
require("dotenv").config()

// libraries
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")
const port = process.env.PORT || 4000
const errorHandler = require("./middlewares/errorHandler")
const authRouter = require("./src/routers/authRouter")
const usersRouter = require("./src/routers/usersRoutes")
// middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "uploads")))
// routes
app.use("/auth", authRouter)
app.use("/users", usersRouter)

// error handler
app.use(errorHandler)

// start
app.listen(port, () => {
	console.log(`\n-- Server is listening on port ${port} --\n`)
})
