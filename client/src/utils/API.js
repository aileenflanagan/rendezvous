import axios from "axios";

export default {

	findById: function(id) {
		// console.log("On: API.js");
		// console.log("id:", id);
		return axios.get("/api/groups/" + id);
	},

	findByUserId: function(id){
		console.log(" UserId: ", id);
		return axios.get("/api/users/"+ id);
	},
	
	findByKeywords: function (keyword) {
		// console.log("On: API.js");
		// console.log("keyword:", keyword);
		return axios.get("/api/groups/search/" + keyword);
	},

	userLogin: function(loginObj){
		// console.log("Login Info", loginObj);

		return axios.post("/api/users/login", loginObj);
	},

	createNewUser: function(newUserObj){
		// console.log("NewUser",newUserObj);
		return axios.post("/api/users/register", newUserObj);
	},


	findCommentsInGroup: function(id) {
		console.log("the group's id: ", id);
		return axios.get("/api/comments/" + id)
	}

};