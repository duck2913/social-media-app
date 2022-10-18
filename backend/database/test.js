const db = require("./config")

const execute = async () => {
	try {
		const query = await db.any(
			"SELECT * FROM information_schema.tables WHERE table_schema = 'public';",
		)
		console.log("🚀 -> file: test.js -> line 6 -> query", query)
	} catch (error) {
		console.log(error)
	}
}

execute()
