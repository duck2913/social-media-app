const db = require("./config")

const execute = async () => {
	try {
		const result = await db.any(`select * from Users`)
		// console.log("🚀 -> file: test.js -> line 6 -> result", result)
		console.log(result)
	} catch (error) {
		console.log("error")
		console.log(error)
	}
}

execute()
