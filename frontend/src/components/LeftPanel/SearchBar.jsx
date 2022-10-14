import { VscRocket } from "react-icons/vsc"
import { BiSearchAlt } from "react-icons/bi"
import { Card, TextInput } from "@mantine/core"

import React from "react"

const SearchBar = () => {
	return (
		<Card className="flex items-center gap-4 mb-[1rem] rounded-xl">
			<VscRocket className="bg-blue-500 text-[2rem] rounded-full p-1 text-white" />
			<div className="relative">
				<TextInput
					type="text"
					className="rounded-md focus:outline-none px-3 placeholder-gray-400 w-full"
					placeholder="#Explore"
				/>
				<div className="bg-blue-500 p-1 rounded-sm absolute right-[1rem] top-[50%] translate-y-[-50%]">
					<BiSearchAlt className="h-[100%] text-md rounded-lg text-white cursor-pointer" />
				</div>
			</div>
		</Card>
	)
}

export default SearchBar
