import React, { useRef } from "react"
import axios from "axios"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Loader } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { Card, TextInput } from "@mantine/core"

const Signup = () => {
	const nameRef = useRef()
	const usernameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()

	const [msg, setMsg] = useState("")
	const navigate = useNavigate()

	const { mutate, isLoading, isError } = useMutation(
		(data) => {
			return axios.post(`${process.env.REACT_APP_URL}/auth/signup`, data)
		},
		{
			onSuccess: (data) => {
				console.log(data)
				setMsg("")
				!isError && navigate("/")
			},
			onError: (error) => {
				console.log("🚀 -> file: Signup.jsx -> line 28 -> error", error)
				setMsg(error.response.data)
			},
		},
	)

	function handleSubmit(e) {
		e.preventDefault()
		const fullname = nameRef.current.value
		const username = usernameRef.current.value
		const password = passwordRef.current.value
		const confirmPassword = confirmPasswordRef.current.value
		const email = emailRef.current.value

		if (confirmPassword !== password) {
			setMsg("Wrong confirm password")
			setTimeout(() => {
				setMsg("")
			}, 3000)
			return
		}
		mutate({ fullname, username, email, password })
	}

	return (
		<div
			className="h-screen flex flex-col justify-center items-center
        ">
			<form onSubmit={handleSubmit}>
				<Card className="form p-5 rounded-xl w-[25rem]">
					{isLoading && <Loader />}
					<h1 className="text-xl font-semibold text-blue-500 mb-10">Sign up</h1>
					{msg && <p className="my-1 text-red-500">{msg}</p>}

					<p className="mb-1">Full name</p>
					<TextInput
						type="text"
						name="full name"
						ref={nameRef}
						required
						className=" rounded-md px-4 mb-5 focus:outline-none focus:border-blue-500 w-full"
					/>

					<p className="mb-1">Email</p>
					<TextInput
						type="email"
						name="email"
						ref={emailRef}
						required
						className=" rounded-md px-4 mb-5 focus:outline-none focus:border-blue-500 w-full"
					/>

					<p className="mb-1">Username</p>
					<TextInput
						type="text"
						name="username"
						ref={usernameRef}
						required
						className=" rounded-md px-4 mb-5 focus:outline-none focus:border-blue-500 w-full"
					/>

					<p className="mb-1">Password</p>
					<TextInput
						type="password"
						name="password"
						required
						ref={passwordRef}
						className=" rounded-md px-4 mb-5 focus:outline-none focus:border-blue-500 w-full"
					/>

					<p className="mb-1">Confirm password</p>
					<TextInput
						type="password"
						name="confirm password"
						required
						ref={confirmPasswordRef}
						className=" rounded-md px-4 mb-8 focus:outline-none focus:border-blue-500 w-full"
					/>

					<button className="mx-auto block font-semibold bg-indigo-500 py-1 px-3 text-white rounded-md">
						Register
					</button>
				</Card>
			</form>
		</div>
	)
}

export default Signup
