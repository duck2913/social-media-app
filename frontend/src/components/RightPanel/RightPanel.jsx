import React from "react"
import { useCookies } from "react-cookie"
import { BiLogOut } from "react-icons/bi"
import { Card } from "@mantine/core"

const trends = [
	{
		name: "minion",
		num: 16,
	},
	{ name: "avengers", num: 98 },
	{ name: "birthday", num: 12 },
	{ name: "avatar", num: 28 },
]

const RightPanel = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["token"])

	function logoutHandler() {
		removeCookie("token")
	}

	return (
		<div className="h-screen p-4">
			<Card className="rounded-xl p-10 relative">
				<h1 className="font-semibold text-xl mb-5 text-blue-500">Trends for you</h1>
				<div className="flex flex-col gap-4">
					{trends.map((trend) => (
						<div id={trend.name}>
							<p className="font-semibold">#{trend.name}</p>
							<p className="text-sm">{trend.num}k shares</p>
						</div>
					))}
				</div>
				<div onClick={logoutHandler}>
					<BiLogOut className="absolute right-5 top-5 w-[2rem] h-[2rem] bg-purple-400 rounded-full p-1 cursor-pointer active:-translate-y-2 transition-all text-purple-600" />
				</div>
			</Card>
		</div>
	)
}

export default RightPanel
