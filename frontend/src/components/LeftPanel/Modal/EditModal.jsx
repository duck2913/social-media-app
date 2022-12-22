import React from "react"
import { TextInput, FileInput, Title } from "@mantine/core"
import { useRef, useState } from "react"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const EditModal = ({ setOpenEditModal }) => {
	const nameRef = useRef()
	const titleRef = useRef()
	const [avatar, setAvatar] = useState()

	function handleChangeInfo() {
		const newFullName = nameRef.current.value
		const newTitle = titleRef.current.value
		const formData = new FormData()
		const { user_id } = JSON.parse(localStorage.getItem("user"))

		avatar && formData.append("avatar", avatar)
		newFullName && formData.append("newFullName", newFullName)
		newTitle && formData.append("newTitle", newTitle)
		formData.append("user_id", user_id)

		mutate(formData)
		setOpenEditModal(false)
	}

	function updateInfo(formData) {
		return axios.put(`${process.env.REACT_APP_URL}/users/update`, formData)
	}

	const queryClient = useQueryClient()
	const { mutate } = useMutation(updateInfo, {
		onSuccess: () => {
			queryClient.invalidateQueries(["user-profile"])
		},
	})

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
				className="block mx-auto mt-5 bg-[#1A2D3F] text-blue-300 py-1 px-2 rounded-lg active:translate-y-1 font-semibold"
				onClick={handleChangeInfo}>
				Submit
			</button>
		</>
	)
}

export default EditModal
