import React from "react"
import { HiPhotograph } from "react-icons/hi"
import { HiVideoCamera } from "react-icons/hi"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { HiCalendar } from "react-icons/hi"

const NewPost = () => {
	return (
		<div className="w-full bg-white rounded-xl p-5 mb-8">
			<div className="flex gap-4 items-center">
				<img
					src="https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGFic3RyYWN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
					alt=""
					className="w-[3rem] h-[3rem] rounded-full inline"
				/>
				<input
					type="text"
					placeholder="What's happening"
					className="w-full p-2 px-4 bg-slate-100 rounded-xl focus:outline-none text-slate-400"
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
				<button className="font-bold bg-blue-500 px-2 py-1 rounded-lg text-white">
					Share
				</button>
			</div>
		</div>
	)
}

export default NewPost
