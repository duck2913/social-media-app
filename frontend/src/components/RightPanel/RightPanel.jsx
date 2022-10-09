import React from "react"
import { BiLogOut } from "react-icons/bi"
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
	return (
		<div className="h-screen p-4">
			<div className="bg-white rounded-xl p-10 relative">
				<h1 className="font-semibold text-xl mb-5 text-blue-500">Trends for you</h1>
				<div className="flex flex-col gap-4">
					{trends.map((trend) => (
						<div>
							<p className="font-semibold">#{trend.name}</p>
							<p className="text-sm">{trend.num}k shares</p>
						</div>
					))}
				</div>
				<BiLogOut className="absolute right-5 top-5 w-[2rem] h-[2rem] bg-purple-200 rounded-full p-1 cursor-pointer active:-translate-y-2 transition-all" />
			</div>
		</div>
	)
}

export default RightPanel
