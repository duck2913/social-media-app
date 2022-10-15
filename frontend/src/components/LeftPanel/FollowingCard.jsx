import React from "react"

const FollowingCard = ({ following }) => {
	function handleUnfollow() {}

	return (
		<div className="w-full flex items-center justify-start gap-3" id={following.user_id}>
			<img
				src={following.avatar_url || process.env.REACT_APP_DEFAULT_IMG_URL}
				alt="avatar"
				className="w-[2.4rem] h-[2.4rem] rounded-full"
			/>
			<div className="flex flex-col">
				<h2 className="text-gray-100 font-semibold text-sm">{following.fullname}</h2>
				<p className="text-sm">{following.tag}</p>
			</div>
			<button
				className="ml-auto font-bold bg-purple-500 text-purple-800 px-2 py-1 rounded-lg active:-translate-y-2 transition-all hover:scale-105"
				onClick={handleUnfollow}
			>
				Unfollow
			</button>
		</div>
	)
}

export default FollowingCard
