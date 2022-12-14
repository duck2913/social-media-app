const db = require("../../database/config")

class User {
	static async addUser(fullname, username, email, password) {
		return await db.any(`insert into Users(fullname,username,email, password,tag) values ($1, $2, $3, $4,$5)`, [
			fullname,
			username,
			email,
			password,
			"@" + username,
		])
	}

	static async addGoogleUser(name, picture, email) {
		try {
			return await db.any(
				`insert into Users(fullname,avatar_url,email,tag,password)
					  values ($1, $2, $3, $4, $5)`,
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
				`
						select user_id,fullname,tag,title,avatar_url
						from Users
						where email = $1 or username = $2`,
				[email, username],
			)
			return queryResult[0]
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async checkPassword(username, password) {
		try {
			const queryResult = await db.any("select * from users where username = $1 and password = $2", [
				username,
				password,
			])
			return queryResult.length > 0 ? true : false
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async getFollowersAndFollowing(user_id) {
		try {
			const followers = await db.any(
				`
				select user_id, fullname, tag,avatar_url
				from users
				where user_id in
					( select id from Follows where following = $1)`,
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
			newFullname && (await db.any("update Users set fullname = $1 where user_id = $2 ", [newFullname, user_id]))
			newTitle && (await db.any("update Users set title = $1 where user_id = $2 ", [newTitle, user_id]))
			newAvatar_Url &&
				(await db.any("update Users set avatar_url = $1 where user_id = $2 ", [newAvatar_Url, user_id]))
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

	static async getAllUsers() {
		try {
			return await db.any("select fullname,tag,avatar_url, user_id from Users")
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async follow(myId, followId) {
		try {
			await db.any("insert into follows(id, following) values($1, $2)", [myId, followId])
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async unfollow(myId, unfollowId) {
		try {
			await db.any("delete from follows where id = $1 and following = $2", [myId, unfollowId])
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}

module.exports = User
