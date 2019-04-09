import React, { Component } from "react";
import "./style.css";
import GroupInfo from "../GroupInfo/index";
import NavbarBasic from "../NavbarBasic";
import AccountInfo from "../AccountInfo";
import GroupCard from "../GroupCard";
import axios from "axios";
import API from "../../utils/API";
import { api } from "cloudinary/lib/cloudinary";

let editing = false;
let changingBtnTxt = "Edit";
// import user data from db
// import group data from db

let groupArr;
let foundGroupInfo=[];
let user=sessionStorage.userDBId;


function clickHandler() {
	console.log("Event for editing goes here", editing);
	editing = !editing;
	console.log(editing);
}


class ManageGroups extends Component {
	constructor(props) {
		super(props)
		this.state = {
			image: "http://res.cloudinary.com/dqadqluxx/image/upload/v1554761308/xpqkcuij73ojzaadealv.jpg",
			name: "",
			email: "",
			zip: "",
			password: "",
			groupId: [],
			groups: [],
			admin: []
		}
	}

	componentDidMount = () => {
		this.loadInfo(user);
	}

	loadInfo = (id) => {
		API.findByUserId(id)
			.then(res => {
				console.log("res.data ", res.data);
				this.setState({
					name: res.data.userName,
					image: res.data.image.length > 10 ? res.data.image : "http://res.cloudinary.com/dqadqluxx/image/upload/v1554761308/xpqkcuij73ojzaadealv.jpg",
					email: res.data.email,
					zip: res.data.zip,
					password: res.data.password,
					groupId: res.data.groupId,
					admin: res.data.admin
				})
				console.log(this.state);
			})
			.then(res=>{
				groupArr=this.state.groupId;			
				groupArr.map((i)=>{
					console.log(i);
					API.findById(i)
					.then(res=>{
						// console.log("resdata", res.data);
						// this.setState({groups: "something"});
						console.log("this.state.groups",this.state.groups);
						foundGroupInfo.push(res.data);
						console.log("foundgroups: ",foundGroupInfo);
						this.setState({groups: "something"})					
					})
					// .then(res=>{
					// 	foundGroupInfo.map((i)=>{
					// 		console.log("mapping foundGroupInfo", i);
					// 	})
					// })
				})
			}
				
			)
			.catch(err => console.log(err));
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
			console.log("pic we got back", data.data[0].secure_url)
			API.updateByUserId("5cabdd3d6c6b343d08ef3610", data.data[0].secure_url)
				.then(function (data) {
					console.log("data we got back", data)
				})
		})

	}
	render() {


		return (<div id="main-manage-div">
			<NavbarBasic />


			<div className="row">
				<div className="col-md-1"></div>
				{/* Profile Pic */}
				<div className="col-md-3" id="profile-pic-div">
					<img src={this.state.image} alt="boohoo" style={{ width: "100px", height: "100px" }} className="img-responsive" />
					<input type="file" id="upload" accept="image/*" onChange={this.fileSelectedHandler} />

					<button onClick={this.uploadHandler}>Upload!</button>

				</div>
				<div className="col-md-1"></div>

				{/* User Info */}
				<div className="col-md-6" id="user-info-div">
					<div className="row" id="edit-row">
						<div className="col-md-10" id="settings-div">
							<AccountInfo
								name={this.state.name}
								email={this.state.email}
								zip={this.state.zip}
								password="******"
							/>
						</div>
						{/* <div className="col-md-2" id="edit-btn-div">
							{editing ? <button onClick={clickHandler}>Save</button> : <button onClick={clickHandler}>edit</button>}
							
						</div> */}
					</div>
				</div>
			</div>

			{/* Joined groups */}
			<div className="row">
				<div className="col-md-1"></div>
				<div className="col-md-10" id="joined-groups-div">

					<div></div>	{/* temporary */}
					<h3>Groups</h3>
					{/* <p>{foundGroupInfo}</p>
					{foundGroupInfo? groups=foundGroupInfo:""} */}
					<GroupCard
						groups={foundGroupInfo}
						


					/>
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
			{/* <div className="row">
				<div className="col-md-1"></div>
				<div className="col-md-10" id="created-groups-div">
					<div>[group card component goes here: group image, group name, reassign btn, delete btn]</div>	
					


				</div>
				<div className="col-md-1"></div>
			</div> */}
		</div>);
	}
}

export default ManageGroups;