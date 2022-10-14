const db = require("./config")

const execute = async () => {
	try {
		const query = await db.any("select * from users")
		console.log("🚀 -> file: test.js -> line 6 -> query", query)
	} catch (error) {
		console.log("error")
		console.log(error)
	}
}

execute()
