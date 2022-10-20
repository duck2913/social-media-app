import { useMutation, useQueryClient } from "@tanstack/react-query"
import MoonLoader from "react-spinners/MoonLoader"
import axios from "axios"

const SuggestCard = ({ person }) => {
	const queryClient = useQueryClient()

	function handleFollow() {
		const followId = person.user_id
		mutate(followId)
	}

	function postFollowRequest(followId) {
		const { user_id: myId } = JSON.parse(localStorage.getItem("user"))
		return axios.post(`${process.env.REACT_APP_URL}/users/follows`, { myId, followId })
	}

	const { mutate, isLoading } = useMutation(postFollowRequest, {
		onSuccess: () => {
			queryClient.invalidateQueries("suggest")
			queryClient.invalidateQueries("followers and followings")
		},
	})

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
			{!isLoading && (
				<button
					className="ml-auto font-bold bg-gradient-to-r bg-[#25445b] text-blue-400 px-2 py-1 rounded-lg active:-translate-y-2 transition-all hover:scale-105 w-[5rem]"
					onClick={handleFollow}
				>
					Follow
				</button>
			)}
			{isLoading && <MoonLoader size={30} color={"#79ebff"} className="ml-auto" />}
		</div>
	)
}

export default SuggestCard
