const db = require("./config")

const execute = async () => {
	try {
		const query = await db.any(
			`
                insert into Posts(user_id, created_at) values($1,$2)
            `,
			[1, new Date()],
		)
		console.log("🚀 -> file: test.js -> line 6 -> query", query)
	} catch (error) {
		console.log(error)
	}
}

execute()
