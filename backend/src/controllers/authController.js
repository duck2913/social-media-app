const postLogin = (req, res, next) => {}

const postSignup = (req, res, next) => {
	const name = req.body.name
	const password = req.body.password
}

module.exports = {
	postLogin,
	postSignup,
}
