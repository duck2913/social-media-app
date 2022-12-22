import React from "react"
import { FiEdit } from "react-icons/fi"
import { Modal } from "@mantine/core"
import { useState } from "react"
import { Card } from "@mantine/core"
import FollowingModal from "./Modal/FollowingModal"
import EditModal from "./Modal/EditModal"
import useUser from "../../hooks/useUser"
import useGetFollowersAndFollowings from "../../hooks/useGetFollowersAndFollowings"

const defaultValues = {
	title: "code dạo",
	fullname: "Joe",
	tag: "@joe",
}

const Info = () => {
	const [openEditModal, setOpenEditModal] = useState(false)
	const [openFollowingModal, setOpenFollowingModal] = useState(false)

	const user = useUser()
	const follows = useGetFollowersAndFollowings()

	return (
		<>
			<Card className="w-[100%] relative rounded-2xl overflow-hidden flex flex-col items-center mb-[2rem] p-0">
				<img
					src="https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YWJzdHJhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
					alt=""
					className="relative h-[6rem] w-full"
				/>
				<img
					src={user?.avatar_url || process.env.REACT_APP_DEFAULT_IMG_URL}
					alt=""
					className="avatar inline w-[3rem] h-[3rem] rounded-full -translate-y-[50%]"
				/>
				<div className="-translate-y-[1rem] text-center">
					<div className="inherit">
						<h1 className="text-md font-bold">{user?.fullname}</h1>
						<FiEdit
							className="absolute top-[5px] right-0 cursor-pointer"
							onClick={() => setOpenEditModal(true)}
						/>
					</div>
					<h1 className="text-xs mt-1 font-semibold">{user?.tag}</h1>
					<p className="text-sm text-gray-500">{user?.title || defaultValues.title}</p>
					<div className="flex mt-[2rem] justify-between w-[10rem]">
						<div className="flex flex-col items-center">
							<div className="font-bold text-white">{follows?.followers.length}</div>
							<div className="text-xs">Followers</div>
						</div>
						<div className="bg-gray-200 h-[2rem] w-[3px]"></div>
						<div
							className="flex flex-col items-center cursor-pointer"
							onClick={() => setOpenFollowingModal(true)}>
							<div className="font-bold text-white">{follows?.followings.length}</div>
							<div className="text-xs">Following</div>
						</div>
					</div>
				</div>
			</Card>
			<Modal centered opened={openEditModal} onClose={() => setOpenEditModal(false)} withCloseButton={false}>
				<EditModal setOpenEditModal={setOpenEditModal} />
			</Modal>
			<Modal
				centered
				opened={openFollowingModal}
				onClose={() => setOpenFollowingModal(false)}
				withCloseButton={false}>
				<FollowingModal />
			</Modal>
		</>
	)
}

export default Info
