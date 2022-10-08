import React from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { AiOutlineMessage } from "react-icons/ai"

const comments = [
	{
		from: "bi",
		message: "dep vai lon",
	},
]

const Post = () => {
	return (
		<div className="w-full bg-white p-5 rounded-xl">
			<img
				src="https://images.unsplash.com/photo-1665149368357-864968813478?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
				alt="post"
				className="post rounded-xl mx-auto"
			/>
			<div className="buttons flex text-[1.5rem] mt-3 gap-3">
				<AiFillHeart className="text-red-400" />
				<AiOutlineHeart />
				<AiOutlineMessage />
			</div>
			<div className="nums_likes text-sm text-gray-400 mt-2 font-semibold">2300 likes</div>
			<div className="mt-5">
				{comments.map((comment) => (
					<div className="flex gap-2 items-center">
						<h3 className="font-semibold">{comment.from}</h3>
						<p className="text-sm">{comment.message}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Post
