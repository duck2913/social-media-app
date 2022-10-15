const db = require("../../database/config")
const bcrypt = require("bcrypt")
const saltRounds = 10

class User {
	static async addUser(fullname, username, email, password, hash) {
		try {
			if (!hash) {
				const hash = await bcrypt.hash(password, saltRounds)
				await db.any(
					`insert into Users(fullname,username,email, password,tag) values ($1, $2, $3, $4, $5)`,
					[fullname, username, email, hash, "@" + username],
				)
			} else {
				await db.any(
					`insert into Users(fullname,username,email, password,tag) values ($1, $2, $3, $4,$5)`,
					[fullname, username, email, hash, "@" + username],
				)
			}
		} catch (error) {
			console.log(error)
			throw err
		}
	}

	static async addGoogleUser(name, picture, email) {
		try {
			return await db.any(
				`insert into Users(fullname,avatar_url,email,tag,password) values ($1, $2, $3, $4, $5)`,
				[name, picture, email, "@" + email.split("@")[0], "co cc chu ma mo"],
			)
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async findByEmailOrName(email, username) {
		try {
			const queryResult = await db.any(
				"select user_id,fullname,tag,title,avatar_url from Users where email = $1 or username = $2",
				[email, username],
			)
			return queryResult[0]
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async checkPassword(username, inputPassword) {
		try {
			const queryResult = await db.any("select * from users where username = $1", username)
			const password = queryResult[0].password
			const valid = await bcrypt.compare(inputPassword, password)
			return valid
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async getFollowersAndFollowing(user_id) {
		try {
			const followers = await db.any(
				"select user_id, fullname, tag,avatar_url from users where user_id in ( select id from Follows where following = $1)",
				user_id,
			)
			const followings = await db.any(
				" select user_id, fullname, tag,avatar_url from users where user_id in (select following from Follows where id = $1)",
				user_id,
			)
			return [followers, followings]
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async updateUserInfo(newFullname, newTitle, newAvatar_Url, user_id) {
		try {
			newFullname &&
				(await db.any("update Users set fullname = $1 where user_id = $2 ", [
					newFullname,
					user_id,
				]))
			newTitle &&
				(await db.any("update Users set title = $1 where user_id = $2 ", [
					newTitle,
					user_id,
				]))
			newAvatar_Url &&
				(await db.any("update Users set avatar_url = $1 where user_id = $2 ", [
					newAvatar_Url,
					user_id,
				]))
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async getUserInfo(user_id) {
		try {
			const queryResult = await db.any("select * from users where user_id = $1", user_id)
			const user = queryResult[0]
			return user
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}

module.exports = User
