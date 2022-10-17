const postAddNewPost = async (req, res) => {
	const { postImg } = req.body
	console.log("🚀: postAddNewPost -> req.body", req.body)
	console.log("🚀: postAddNewPost -> postImg", postImg)
	res.json("test")
}

module.exports = {
	postAddNewPost,
}
