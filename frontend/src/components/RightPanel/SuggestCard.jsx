import React from "react"

const SuggestCard = ({ person }) => {
	function handleFollow() {}

	return (
		<div className="w-full flex items-center justify-start gap-3" id={person.user_id}>
			<img
				src={person.avatar_url || process.env.REACT_APP_DEFAULT_IMG_URL}
				alt="avatar"
				className="w-[2.4rem] h-[2.4rem] rounded-full"
			/>
			<div className="flex flex-col">
				<h2 className="text-gray-100 font-semibold text-sm">{person.fullname}</h2>
				<p className="text-sm">{person.tag}</p>
			</div>
			<button
				className="ml-auto font-bold bg-gradient-to-r bg-[#25445b] text-blue-400 px-2 py-1 rounded-lg active:-translate-y-2 transition-all hover:scale-105 w-[5rem]"
				onClick={handleFollow}
			>
				Follow
			</button>
		</div>
	)
}

export default SuggestCard
