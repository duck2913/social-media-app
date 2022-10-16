import { Card } from "@mantine/core"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import SuggestCard from "./SuggestCard"

const Suggest = () => {
	function getSuggestPeople() {
		const { user_id } = JSON.parse(localStorage.getItem("user"))
		return axios.get(`http://localhost:4000/users/suggest/${user_id}`)
	}

	const { data } = useQuery(["suggest"], getSuggestPeople)

	return (
		<Card className="rounded-xl">
			<h1 className="font-semibold text-lg text-blue-400 p-3 mb-4">People you might know</h1>
			<div className="flex flex-col gap-4">
				{data && data.data.map((person) => <SuggestCard person={person} />)}
			</div>
		</Card>
	)
}

export default Suggest
