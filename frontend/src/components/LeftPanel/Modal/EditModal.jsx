import React from "react"
import { TextInput, FileInput, Title } from "@mantine/core"
import { useRef, useState } from "react"

const EditModal = ({ setOpenEditModal }) => {
	const nameRef = useRef()
	const titleRef = useRef()
	const [avatar, setAvatar] = useState()

	function handleChangeInfo() {
		const newFullName = nameRef.current.value
		console.log("🚀 -> file: EditModal.jsx -> line 12 -> newFullName", newFullName)
		const newTitle = titleRef.current.value
		console.log("🚀 -> file: EditModal.jsx -> line 14 -> newTitle", newTitle)
		console.log(avatar)
		setOpenEditModal(false)
	}

	return (
		<>
			<Title order={4} className="mb-4">
				Edit your profile
			</Title>
			<div className="mb-2">
				<TextInput placeholder="ex: Xiu Iu" label="Your Name" ref={nameRef} />
			</div>
			<div className="mb-2">
				<TextInput placeholder="ex: Code dạo" label="Your title" ref={titleRef} />
			</div>
			<div className="mb-2">
				<FileInput
					placeholder="Pick file"
					label="Your avatar image"
					accept="image/png,image/jpeg"
					onChange={setAvatar}
					value={avatar}
				/>
			</div>

			<button
				className="block mx-auto mt-5 bg-[#1A2D3F] text-blue-300 py-1 px-2 rounded-lg"
				onClick={handleChangeInfo}
			>
				Submit
			</button>
		</>
	)
}

export default EditModal
