import React, { useRef } from "react"
import { useState } from "react"

const Signup = () => {
	const nameRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()

	const [error, setError] = useState("")

	function handleSubmit(e) {
		e.preventDefault()
		const name = nameRef.current.value
		const password = passwordRef.current.value
		const confirmPassword = confirmPasswordRef.current.value

		if (confirmPassword !== password) {
			setError("Confirm password is not correct!")
		}

		// send request(name, password, confirmPassword)
		setError("")
	}

	return (
		<div
			className="h-screen flex flex-col justify-center items-center bg-gray-100
        "
		>
			<form className="form bg-white p-5 rounded-xl px-20" onSubmit={handleSubmit}>
				<h1 className="text-xl font-semibold text-blue-500 mb-10">Sign up</h1>
				{error && <p className="my-1 text-red-500">{error}</p>}
				<p className="mb-1">Name</p>
				<input
					type="text"
					name="name"
					ref={nameRef}
					required
					className="border-blue-200 border-[2px] rounded-md px-4 mb-5 focus:outline-none focus:border-blue-500"
				/>
				<p className="mb-1">Password</p>
				<input
					type="password"
					name="password"
					required
					ref={passwordRef}
					className="border-blue-200 border-[2px] rounded-md px-4 mb-5 focus:outline-none focus:border-blue-500"
				/>
				<p className="mb-1">Confirm password</p>
				<input
					type="password"
					name="confirm password"
					required
					ref={confirmPasswordRef}
					className="border-blue-200 border-[2px] rounded-md px-4 mb-8 focus:outline-none focus:border-blue-500"
				/>
				<button className="mx-auto block font-semibold bg-indigo-500 py-1 px-3 text-white rounded-md">
					Register
				</button>
			</form>
		</div>
	)
}

export default Signup
