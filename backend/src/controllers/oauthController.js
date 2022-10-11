const jwt = require("jsonwebtoken")

const googleSignIn = (req, res) => {
	const name = req.body.name
	const picture = req.body.picture
	const token = jwt.sign({ name, picture }, process.env.JWT_SECRET, { expiresIn: "1h" })
	res.json({
		message: "login with google successfully",
		token: token,
	})
}

module.exports = {
	googleSignIn,
}
