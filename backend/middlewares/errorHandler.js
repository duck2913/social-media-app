const errorHandler = async (err, req, res, next) => {
	res.status(500).json("Error: " + err)
}

module.exports = errorHandler
