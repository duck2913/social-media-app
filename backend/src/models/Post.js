const db = require("../../database/config")

class Post {
	static async addNewPost(user_id, postMsg, postImgUrl) {
		try {
			await db.any(
				`insert into Posts(user_id, content, post_img_url)
                values ($1,$2,$3)`,
				[user_id, postMsg, postImgUrl],
			)
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async getAllPosts() {
		try {
			return await db.any("select * from Posts order by post_id desc")
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async likeAPost(userId, postId) {
		try {
			await db.any("insert into Likes(user_id, post_id) values($1,$2)", [userId, postId])
		} catch (error) {
			throw error
		}
	}

	static async unlikeAPost(userId, postId) {
		try {
			await db.any("delete from Likes where user_id = $1 and post_id = $2", [userId, postId])
		} catch (error) {
			throw error
		}
	}

	static async getLikedPostsId(userId) {
		try {
			return await db.any(`select post_id from likes where user_id = $1`, userId)
		} catch (error) {
			throw error
		}
	}

	static async getLikesCount(postId) {
		try {
			const queryResult = await db.any(
				"select count(user_id) from Likes where post_id = $1",
				postId,
			)
			return queryResult[0].count
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async getAllComments(postId) {
		try {
			return await db.any("select * from Comments where post_id = $1", postId)
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async addComment(postId, content, userId) {
		try {
			await db.any(
				`insert into Comments(post_id, content, user_id)
                values ($1, $2, $3)`,
				[postId, content, userId],
			)
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}

module.exports = Post
