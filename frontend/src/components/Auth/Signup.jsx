import React, { useRef } from "react"
import axios from "axios"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Loader, Notification } from "@mantine/core"
import { useNavigate } from "react-router-dom"

const Signup = () => {
	const nameRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()

	const [msg, setMsg] = useState("")
	const [opened, setOpened] = useState(false)
	const navigate = useNavigate()

	const { mutate, isLoading, isError } = useMutation(
		(data) => {
			return axios.post(`http://localhost:4000/auth/signup`, data)
		},
		{
			onSuccess: () => {
				setOpened(true)
				setMsg("")
			},
			onError: (error) => {
				console.log("🚀 -> file: Signup.jsx -> line 28 -> error", error)
				setMsg(error.response.data)
			},
		},
	)

	function handleSubmit(e) {
		e.preventDefault()
		const name = nameRef.current.value
		const password = passwordRef.current.value
		const confirmPassword = confirmPasswordRef.current.value

		if (confirmPassword !== password) {
			setMsg("Wrong confirm password")
			setTimeout(() => {
				setMsg("")
			}, 3000)
			return
		}
		mutate({ name, password })
	}

	return (
		<div
			className="h-screen flex flex-col justify-center items-center bg-gray-100
        "
		>
			{opened && (
				<Notification
					color="teal"
					title="Success"
					className="fixed bottom-5 right-5"
					onClick={() => {
						setOpened(false)
						!isError && navigate("/")
					}}
				>
					You have been register with us!
				</Notification>
			)}
			<form className="form bg-white p-5 rounded-xl w-[20rem]" onSubmit={handleSubmit}>
				{isLoading && <Loader />}
				<h1 className="text-xl font-semibold text-blue-500 mb-10">Sign up</h1>
				{msg && <p className="my-1 text-red-500">{msg}</p>}
				<p className="mb-1">Name</p>
				<input
					type="text"
					name="name"
					ref={nameRef}
					required
					className="border-blue-200 border-[2px] rounded-md px-4 mb-5 focus:outline-none focus:border-blue-500 w-full"
				/>
				<p className="mb-1">Password</p>
				<input
					type="password"
					name="password"
					required
					ref={passwordRef}
					className="border-blue-200 border-[2px] rounded-md px-4 mb-5 focus:outline-none focus:border-blue-500 w-full"
				/>
				<p className="mb-1">Confirm password</p>
				<input
					type="password"
					name="confirm password"
					required
					ref={confirmPasswordRef}
					className="border-blue-200 border-[2px] rounded-md px-4 mb-8 focus:outline-none focus:border-blue-500 w-full"
				/>
				<button className="mx-auto block font-semibold bg-indigo-500 py-1 px-3 text-white rounded-md">
					Register
				</button>
			</form>
		</div>
	)
}

export default Signup
