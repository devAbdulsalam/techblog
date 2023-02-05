import React, {useState, useContext} from 'react'
import Img from '../../assests/avatar-05.png'
import { AuthContext } from '../../context/AuthContext';
import UpdateProfile from './UpdateProfile';
import UpdateImage from './UpdateImage';
import Setting from './../../pages/Setting';

const Profile = () => {
const {user} = useContext(AuthContext)
  const [profile, setProfile] = useState(true);
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [setting, setSetting] = useState(false);

  const handleSetting = () =>{
    setSetting(true)
    setProfile(false)
	  setEdit(false)
	  setEditImage(false)
  }
  const handleEdit = () =>{
    setEdit(true)
	setEditImage(false)
    setProfile(false)
	setSetting(false)
  }
  const handleProfile = () =>{
	  setProfile(true)
	  setEdit(false)
	  setEditImage(false)
	setSetting(false)
  }
  const handleImage = () =>{
	  setProfile(false)
	  setEditImage(true)
	  setEdit(false)
		setSetting(false)
  }

  return (
    <div className='min-h-screen pt-14 bg-gray-50'>     
			 <article
				className="w-full flex flex-col pt-10 p-3 gap-4 md:w-8/12 m-auto"
			>
				<div
					className="flex w-full md:w-5/12 h-fit flex-col justify-center items-center relative rounded-lg bg-white shadow-sm my-2 py-3"
				>
					<div className='relative'>
						<img
							id="userImage"
							className="inline-block h-24 w-24 md:h-32 md:w-32 rounded-full ring-2 ring-white"
							src={Img} 
							alt="userimage"
						/>
					<div className="absolute top-2 right-5 cursor-pointer">
						<i id="editProfile" onClick={handleImage} className="fa-solid fa-pen-to-square"></i>
					</div>
					</div>
					<div className="">
						<p id="userName" className="font-bold text-xl text-center p-2">
							Hi, {user.user.name || "Abdulsalam"}
						</p>
					</div>
					<hr className="w-full text-gray-50 opacity-20" />
					<div className="w-full p-3 flex justify-around text-xl">
						<div className="flex md:space-x-2">
							<p><span className="font-semibold">Phone</span> {user?.user.phone ||  "903 509 5174"}</p>
						</div>
					</div>
				</div>
				<div
					className="flex w-full flex-col justify-center items-center relative rounded-lg bg-white shadow-sm my-2"
				>
					<div
						className="w-full px-3  flex justify-start items-center gap-1 text-lg md:text-xl pt-5"
					>
						<div className={`flex place-items-center border-green-500 py-px cursor-pointer ${profile ? "border-b-2" : ''}`}>
							<h3 className="text-green-500 md:font-semibold px-2 py-px" onClick={handleProfile}>Overview</h3>
						</div>
						<div className={`flex place-items-center border-green-500 py-px cursor-pointer ${edit ? "border-b-2" : ''}`}>
							<h3 className="text-green-500 md:font-semibold px-2 py-px" onClick={handleEdit}>Update Profile</h3>
						</div>
						<div className={`flex place-items-center border-green-500 py-px cursor-pointer ${setting ? "border-b-2" : ''}`}>
							<h3 className="text-green-500 md:font-semibold px-2 py-px" onClick={handleSetting}>Settings</h3>
						</div>
					</div>
					<hr className="w-full text-gray-50 opacity-80" />
					{profile ?
					<div className="w-full">
						<hr className="w-full text-gray-50 opacity-20" />
						<div className="w-full px-3 py-2.5 flex justify-between md:justify-start space-x-4 gap-4">
							<div className="flex place-items-center p-2">
								<i className="bi bi-person"></i>
								<p className="mx-1 text-xl">Full Name</p>
							</div>
							<div className="flex place-items-center">
								<h3 className="">{user?.user.name || "Abdulsalam M."}</h3>
							</div>
						</div>
						<hr className="w-full text-gray-50 opacity-20" />
						<div className="w-full px-3 py-2.5 flex justify-between md:justify-start space-x-4 gap-4">
							<div className="flex place-items-center p-2">
								<i id="userPhone" className="bi bi-telephone"></i>
								<p className="mx-1 text-xl">Phone Number</p>
							</div>
							<div className="flex place-items-center">
								<h3 className="">{user?.user.phone ||  "09035095173"}</h3>
							</div>
						</div>
						<hr className="w-full text-gray-50 opacity-20" />
						<div className="w-full px-3 py-2.5 flex justify-between md:justify-start space-x-4 gap-4">
							<div className="flex gap-2 place-items-center p-2">
								<i id="userEmail" className="bi bi-envelope"></i>
								<p className="mx-1 text-xl">Email</p>
							</div>
							<div className="flex place-items-center">
								<h3>{user?.user.email || "ammuftau@gmail.com"}</h3>
							</div>
						</div>
						<hr className="w-full text-gray-50 opacity-20" />
						<div className="w-full px-3 py-2.5 flex justify-between md:justify-start space-x-4 gap-4">
							<div className="flex place-items-center p-2">
								<i id="userAddress" className="bi bi-house"></i>
								<p className="mx-1 text-xl">Address</p>
							</div>
							<div className="flex place-items-center">
								<h3>{user?.user.address || "Always Changing"}</h3>
							</div>
						</div>
						<hr className="w-full text-gray-50 opacity-20" />
						<div className="w-full px-3 py-2.5 flex justify-between md:justify-start space-x-4 gap-4">
							<div className="flex gap-2 place-items-center p-2">
								<p className="mx-1 text-xl">Level</p>
							</div>
							<div className="flex place-items-center">
								<h3>{user?.user.tier || "Tier 2"}</h3>
							</div>
						</div>
					</div> : ""}
					{setting ? <Setting  handleImage={handleImage}/> : ""} 
					{edit ? <UpdateProfile user={user} token={user?.token} setEdit={setEdit} setProfile={setProfile}/> : ""}
					{editImage ? <UpdateImage user={user} token={user?.token} setEditImage={setEditImage} setProfile={setProfile}/> : ""}
				</div>
			</article>
    </div>
  )
}

export default Profile
