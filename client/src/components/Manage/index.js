import React from "react";
import "./style.css";
import GroupInfo from "../GroupInfo/index";
import NavbarBasic from "../NavbarBasic";
import AccountInfo from "../AccountInfo";
import GroupCard from "../GroupCard";
import axios from "axios";


// import user data from db
// import group data from db


function clickHandler() {
	console.log("Event for editing goes here");
}


class ManageGroups extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			image:""
		}
	}
	fileSelectedHandler = (event) => {
		console.log("this is our photo", event.target.files[0])
		const files = Array.from(event.target.files)
		const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })
		
		axios.post("http://localhost:3001/api/users/userSave", formData, {
			headers: {
				'Content-Type': 'multipart/form-data' 
			
		}
	}).then(function (data) {
		console.log("pic we got back", data)
	})
	}
	render () {

	
	return (<>
		<NavbarBasic />
		<div className="row">
			<div className="col-md-1"></div>
			{/* Profile Pic */}
			<div className="col-md-3" id="profile-pic-div">[current profile pic] <input  
            type="file" 
            id="upload" 
            onChange = {this.fileSelectedHandler} /> </div>
			<div className="col-md-1"></div>

			{/* User Info */}
			<div className="col-md-6" id="user-info-div">
				<div className="row" id="edit-row">
					<div className="col-md-10" id="settings-div">
						<AccountInfo
							name={"this.state.name"}
							email={"this.state.email"}
							location={"this.state.location"}
							password={"this.state.password"}
						/>
					</div>
					<div className="col-md-2" id="edit-btn-div">
						<button onClick={clickHandler} className="btn btn-primary" id="edit-btn">Edit</button>
					</div>
				</div>
			</div>
		</div>

		{/* Joined groups */}
		<div className="row">
			<div className="col-md-1"></div>
			<div className="col-md-10" id="joined-groups-div">

				<div>[group card component goes here: group image, group name]</div>	{/* temporary */}

				<GroupCard />
				{/* <GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard /> */}


			</div>
			<div className="col-md-1"></div>
		</div>

		{/* Created Groups */}
		<div className="row">
			<div className="col-md-1"></div>
			<div className="col-md-10" id="created-groups-div">
				<div>[group card component goes here: group image, group name, reassign btn, delete btn]</div>	{/* temporary */}
				<GroupCard
					groupName={"props.groupName"}
				/>


			</div>
			<div className="col-md-1"></div>
		</div>
	</>);
}}

export default ManageGroups;