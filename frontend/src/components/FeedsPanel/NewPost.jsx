import { Card, TextInput } from "@mantine/core"
import React from "react"
import { HiPhotograph } from "react-icons/hi"
import { HiVideoCamera } from "react-icons/hi"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { HiCalendar } from "react-icons/hi"

const NewPost = () => {
	return (
		<Card className="w-full rounded-xl p-5 mb-8">
			<div className="flex gap-4 items-center">
				<img
					src={process.env.REACT_APP_DEFAULT_IMG_URL}
					alt=""
					className="w-[3rem] h-[3rem] rounded-full inline"
				/>
				<TextInput
					type="text"
					placeholder="What's happening"
					className="w-full rounded-xl focus:outline-none"
				/>
			</div>
			<div className="options mt-4 flex justify-center gap-8 font-semibold">
				<div className="option flex items-center gap-2 cursor-pointer text-red-400">
					<input type="file" name="" id="" className="hidden" />
					<HiPhotograph />
					<p>Image</p>
				</div>
				<div className="option flex items-center gap-2 text-indigo-600">
					<HiVideoCamera />
					<p>Video</p>
				</div>
				<div className="option flex items-center gap-2 text-green-500">
					<HiOutlineLocationMarker />
					<p>Location</p>
				</div>
				<div className="option flex items-center gap-2 text-orange-500">
					<HiCalendar />
					<p>Calendar</p>
				</div>
				<button className="font-bold bg-blue-500 px-2 py-1 rounded-lg text-white active:-translate-y-2 transition-all">
					Share
				</button>
			</div>
		</Card>
	)
}

export default NewPost
