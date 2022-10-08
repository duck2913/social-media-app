import React from "react"

const Info = () => {
	return (
		<div className="bg-white w-[100%] relative rounded-2xl overflow-hidden flex flex-col items-center">
			<img
				src="https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YWJzdHJhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
				alt=""
				className="relative h-[6rem] w-full"
			/>
			<img
				src="https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGFic3RyYWN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
				alt=""
				className="inline w-[3rem] h-[3rem] rounded-full -translate-y-[50%]"
			/>
			<div className="-translate-y-[1rem] text-center">
				<h1 className="text-md font-bold">Minh Duc</h1>
				<p className="text-sm text-gray-500">Junior Fullstack Developer</p>
				<div className="flex mt-[2rem] justify-between">
					<div className="flex flex-col">
						<div className="font-semibold">1234</div>
						<div>Followers</div>
					</div>
					<div className="bg-gray-200 h-[4rem] w-[2px]"></div>
					<div className="flex flex-col">
						<div className="font-semibold">1234</div>
						<div>Following</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Info
