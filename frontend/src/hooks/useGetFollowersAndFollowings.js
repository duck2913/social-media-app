import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getFollowersAndFollowing() {
	const { user_id } = JSON.parse(localStorage.getItem("user"))
	const res = await axios.get(`${process.env.REACT_APP_URL}/users/follows/${user_id}`)
	return res.data
}

const useGetFollowersAndFollowings = () => {
	const { data } = useQuery(["followers and followings"], getFollowersAndFollowing)
	return data
}

export default useGetFollowersAndFollowings
