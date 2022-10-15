import React from "react"

const FollowerCard = (props) => {
	const { follower, followings } = props

	function handleFollow() {}

	function handleUnfollow() {}

	return (
		<div className="w-full flex items-center justify-start gap-3" id={follower.user_id}>
			<img
				src={follower.avatar_url || process.env.REACT_APP_DEFAULT_IMG_URL}
				alt="avatar"
				className="w-[2.4rem] h-[2.4rem] rounded-full"
			/>
			<div className="flex flex-col">
				<h2 className="text-gray-100 font-semibold text-sm">{follower.fullname}</h2>
				<p className="text-sm">{follower.tag}</p>
			</div>
			{followings?.findIndex((item) => item.user_id === follower.user_id) === -1 ? (
				<button
					className="ml-auto font-bold bg-gradient-to-r from-purple-600  to-pink-500 text-white px-2 py-1 rounded-lg active:-translate-y-2 transition-all w-[5.5rem] hover:scale-105"
					onClick={handleFollow}
				>
					Follow
				</button>
			) : (
				<button
					className="ml-auto font-bold bg-purple-500 text-purple-800 px-2 py-1 rounded-lg active:-translate-y-2 transition-all hover:scale-105"
					onClick={handleUnfollow}
				>
					Unfollow
				</button>
			)}
		</div>
	)
}

export default FollowerCard
