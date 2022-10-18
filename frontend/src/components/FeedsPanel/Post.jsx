import React from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { AiOutlineMessage } from "react-icons/ai"
import { Card } from "@mantine/core"

const comments = [
	{
		from: "bi",
		message: "be xiu yeu thien than ",
	},
]

function formatDate(date) {
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}
	const formatted = new Intl.DateTimeFormat("vi-VI", options).format(date)
	return formatted
}

function calcTimePass(date) {
	const time = Math.round((Date.now() - date) / 1000)
	console.log("🚀: calcTimePass -> time", time)
	if (time <= 60) {
		return `${time}s`
	}
	if (time <= 3600) {
		return `${Math.round(time / 60)} phút`
	}
	if (time <= 3600 * 24) {
		return `${Math.round(time / 60 / 60)}h`
	}
	if (time <= 86400 * 30) {
		return `${Math.round(time / 60 / 60 / 24)} ngày`
	}
	if (time <= 86400 * 30 * 12) {
		return `${Math.round(time / 60 / 60 / 24 / 30)} tháng`
	}
	if (time <= 86400 * 30 * 12 * 100) {
		return `${Math.round(time / 60 / 60 / 24 / 30 / 12)} năm`
	}
}

const Post = ({ post }) => {
	return (
		<Card className="rounded-xl px-[1.5rem]">
			<div className="flex gap-2 items-start mb-4">
				<img
					src={post.user_img_url}
					alt="user"
					className="w-[2rem] h-[2rem] rounded-full"
				/>
				<h1 className="font-bold text-gray-500">{post.user_tag}</h1>
				<div className="ml-auto flex flex-col text-sm text-gray-500 items-end">
					<p>{formatDate(new Date(post.created_at))}</p>
					<p>{calcTimePass(new Date(post.created_at))} trước</p>
				</div>
			</div>
			<p className="mb-4 text-lg">{post.content}</p>
			{post.post_img_url && (
				<img src={post.post_img_url} alt="post" className="post rounded-xl mx-auto" />
			)}
			<div className="buttons flex text-[1.5rem] mt-3 gap-3">
				<AiFillHeart className="text-red-400" />
				<AiOutlineHeart />
				<AiOutlineMessage />
			</div>
			<div className="nums_likes text-sm text-gray-400 mt-2 font-semibold">2300 likes</div>
			<div className="mt-5">
				{comments.map((comment) => (
					<div className="flex gap-2 items-center" key={comment.from}>
						<h3 className="font-semibold">{comment.from}</h3>
						<p className="text-sm">{comment.message}</p>
					</div>
				))}
			</div>
		</Card>
	)
}

export default Post
