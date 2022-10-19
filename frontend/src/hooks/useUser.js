import axios from "axios"
import { useQuery } from "@tanstack/react-query"

async function getUserInfo() {
	const { user_id } = JSON.parse(localStorage.getItem("user"))
	const res = await axios.get(`/users/${user_id}`)
	return res.data
}

const useUser = () => {
	const { data } = useQuery(["user-profile"], getUserInfo)
	return data
}

export default useUser
