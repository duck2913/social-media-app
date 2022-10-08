import { VscRocket } from "react-icons/vsc"
import { BiSearchAlt } from "react-icons/bi"

import React from "react"

const SearchBar = () => {
	return (
		<div className="flex items-center gap-4 mb-[1rem]">
			<VscRocket className="bg-blue-500 text-[2rem] rounded-full p-1 text-white" />
			<div className="relative">
				<input
					type="text"
					className="bg-gray-300 rounded-md p-1 focus:outline-none px-3 placeholder-gray-400"
					placeholder="#Explore"
				/>
				<div className="bg-blue-500 p-1 rounded-sm absolute right-[3px] top-[50%] translate-y-[-50%]">
					<BiSearchAlt className="h-[100%] text-md rounded-lg text-white cursor-pointer" />
				</div>
			</div>
		</div>
	)
}

export default SearchBar
