import { Card } from "@mantine/core"
import React from "react"
import { useCookies } from "react-cookie"
import { BiLogOut } from "react-icons/bi"

const trends = [
	{
		name: "minion",
		num: 16,
	},
	{ name: "avengers", num: 98 },
	{ name: "birthday", num: 12 },
]

const Trends = () => {
	const [, , removeCookie] = useCookies(["token"])
	function logoutHandler() {
		removeCookie("token")
	}

	return (
		<Card className="rounded-xl p-10 relative mb-5">
			<h1 className="font-semibold text-xl mb-3 text-blue-500">Trends for you</h1>
			<div className="flex flex-col gap-3">
				{trends.map((trend) => (
					<div key={(Math.random() + 1).toString(36).substring(7)}>
						<p className="font-semibold">#{trend.name}</p>
						<p className="text-sm">{trend.num}k shares</p>
					</div>
				))}
			</div>
			<div onClick={logoutHandler}>
				<BiLogOut className="absolute right-5 top-5 w-[2rem] h-[2rem] bg-purple-400 rounded-full p-1 cursor-pointer active:-translate-y-2 transition-all text-purple-700 hover:-translate-y-1" />
			</div>
		</Card>
	)
}

export default Trends
