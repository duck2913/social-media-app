// libraries
const express = require("express")
const app = express()
const port = process.env.PORT || 4000

const errorHandler = require("../middlewares/errorHandler")
const authRouter = require("./routers/authRouter")
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use("/auth", authRouter)

// error handler
app.use(errorHandler)

// start
app.listen(port, () => {
	console.log(`-- Server is listening on port ${port}`)
})
