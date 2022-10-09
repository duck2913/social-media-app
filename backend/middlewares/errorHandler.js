const errorHandler = async (err, req, res, next) => {
	console.log(`Catch an error: ${err}`)
}

module.exports = errorHandler
