import React from "react"

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
			<div className="bg-white rounded-xl p-10">
				<h1 className="font-semibold text-xl mb-5 text-blue-500">Trends for you</h1>
				<div className="flex flex-col gap-4">
					{trends.map((trend) => (
						<div>
							<p className="font-semibold">#{trend.name}</p>
							<p className="text-sm">{trend.num}k shares</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default RightPanel
