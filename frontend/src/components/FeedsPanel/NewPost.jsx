import { Card, TextInput } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import React, { useRef, useState } from "react"
import { HiPhotograph } from "react-icons/hi"
import { HiVideoCamera } from "react-icons/hi"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { HiCalendar } from "react-icons/hi"
import useUser from "../../hooks/useUser"
const NewPost = () => {
	const user = useUser()
	const [statusMsg, setStatusMsg] = useState("")
	const [previewImgUrl, setPreviewImgUrl] = useState("")
	const postImgRef = useRef(null)

	function handleUploadPostImg(e) {
		setPreviewImgUrl(URL.createObjectURL(e.target.files[0]))
	}

	function clearPreviewImg() {
		postImgRef.current.value = null
		setPreviewImgUrl(null)
	}

	function handleAddNewPost() {
		const postMsg = statusMsg
		const postImg = postImgRef.current.files[0]
		if (!postMsg && !postImg) return
		mutate({ postMsg, postImg })
	}

	const { mutate } = useMutation((data) => {
		return axios.post("/posts/new-post", data)
	})

	return (
		<Card className="w-full rounded-xl p-5 mb-8">
			<div className="flex gap-4 items-center">
				<img
					src={user?.avatar_url || process.env.REACT_APP_DEFAULT_IMG_URL}
					alt=""
					className="w-[3rem] h-[3rem] rounded-full inline"
				/>
				<TextInput
					type="text"
					placeholder="What's happening"
					className="w-full rounded-xl focus:outline-none"
					value={statusMsg}
					onChange={(e) => setStatusMsg(e.target.value)}
				/>
			</div>
			<div className="options mt-4 flex justify-center gap-8 font-semibold">
				<div className="option flex items-center gap-2 cursor-pointer text-red-400">
					<input
						type="file"
						id="postImg"
						className="hidden"
						ref={postImgRef}
						onChange={(e) => handleUploadPostImg(e)}
					/>
					<label htmlFor="postImg" className="flex items-center gap-2 cursor-pointer">
						<HiPhotograph />
						<p>Image</p>
					</label>
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
				<button
					className="font-bold bg-blue-500 px-2 py-1 rounded-lg text-white active:-translate-y-2 transition-all"
					onClick={handleAddNewPost}
				>
					Share
				</button>
			</div>
			{previewImgUrl && (
				<div className="relative">
					<img
						src={previewImgUrl}
						alt=""
						className="w-1/2 block mx-auto object-cover rounded-lg mt-4"
					/>
					<div
						className="absolute top-[5px] right-[26%] rounded-full flex items-center justify-center w-[1rem] h-[1rem] p-2 text-xs bg-[#252424a9] text-white cursor-pointer"
						onClick={clearPreviewImg}
					>
						x
					</div>
				</div>
			)}
		</Card>
	)
}

export default NewPost
