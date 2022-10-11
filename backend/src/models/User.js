const db = require("../../database/config")

class User {
	static async find(name, password) {
		return db.any("select name from users where name = $1 and password = $2", [name, password])
	}

	static async findByName(name) {
		return db.any("select name from users where name = $1", [name])
	}

	static async addGoogleUser(username, picture) {
		const password = "cos cai lon chu ma mo"
		await db.any(`insert into users(name, password, avatar_url) values ($1, $2, $3)`, [
			username,
			password,
			picture,
		])
	}

	static async addUser(username, password) {
		try {
			await db.any(`insert into users(name, password) values ($1, $2)`, [username, password])
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async getNameAndPassword(username) {
		return await db.any(`select name,password from users where name = $1 and password = $2`, [
			username,
			password,
		])
	}
}

module.exports = User
