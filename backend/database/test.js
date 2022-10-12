const db = require("./config")

const execute = async () => {
	try {
		fullname = "hoang Minh duc"
		picture = "http://"
		email = "test@email.com"
		const result = await db.any(
			`insert into Users(fullname, avatar_url ,email ,tag ,password) values ($1, $2, $3,$4,$5)`,
			[
				fullname,
				picture,
				email,
				"@" + fullname.toLowerCase().split("").join(""),
				"co cc chu ma mo",
			],
		)
		console.log("🚀 -> file: test.js -> line 6 -> result", result)
	} catch (error) {
		console.log("error")
		console.log(error)
	}
}

execute()
