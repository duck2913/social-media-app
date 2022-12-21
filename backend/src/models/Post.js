const db = require("../../database/config")

class Post {
	static async addNewPost(user_id, postMsg, postImgUrl) {
		try {
			await db.any(
				`insert into Posts(user_id, content, post_img_url, created_at)
				values ($1,$2,$3,$4)`,
				[user_id, postMsg, postImgUrl, new Date()],
			)
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async getAllPosts() {
		try {
			return await db.any(`
				select p.post_id, p.user_id, p.content, p.post_img_url, p.created_at, u.fullname, u.avatar_url, u.tag
				from posts p
				natural join users u
				order by p.post_id desc`)
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
			const queryResult = await db.any("select count(user_id) from Likes where post_id = $1", postId)
			return queryResult[0].count
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	static async getAllComments(postId) {
		try {
			return await db.any(
				`
			select c.comment_id, c.post_id, c.content, c.post_id, u.avatar_url, u.user_name, u.tag
			from Comments c natural join Users u
			where c.post_id = $1
			order by c.comment_id
			`,
				postId,
			)
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
			console.log()
			throw error
		}
	}
}

module.exports = Post
