import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const useFollowSomeone = (followId) => {
	const queryClient = useQueryClient()

	function postFollowRequest(followId) {
		const { user_id: myId } = JSON.parse(localStorage.getItem("user"))
		return axios.post(`/users/follows`, { myId, followId })
	}

	const { mutate, isLoading } = useMutation(postFollowRequest, {
		onSuccess: () => {
			queryClient.invalidateQueries("suggest")
			queryClient.invalidateQueries("followers and followings")
		},
	})

	return { mutate, isLoading }
}

export default useFollowSomeone
