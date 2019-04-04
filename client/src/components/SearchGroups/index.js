import React, { Component } from "react";
import "./style.css";
import GroupCard from "../GroupCard";
import API from "../../utils/API";

class Search extends Component {
	state = {
		groups: [],
		search: ''
	}

	handleInputChange = event => {
		console.log("event.target.value: ", event.target.value)
		this.setState({ search: event.target.value })
	}


	searchGroupsKeyword = () => {

		API.findByKeywords(this.state.search)
			.then(response => {
				this.setState({ groups: response.data })
				console.log("response.data: ", response.data)
			})
	}

	render() {
		return (<>

			<div className="row group-search-rows">
				<div className="col-md-1"></div>
				<div className="col-md-6">
					<h1>Search Groups</h1>

					<p className="pea-tags">Search by Keyword</p>
					<input type="text"></input>
					<button onClick={this.searchGroupsKeyword}>Search</button>

					<p className="pea-tags">Search by Location</p>
					<input type="text"></input>
					<button>Search</button>
				</div>
			</div>

			<div className="row group-search-rows">
				<div className="col-md-1"></div>
				<div className="col-md-8">

					{/* TODO: dynamically add the groups that a user
					is part of and make new GroupCards for each one */}
					{this.state.groups.map(group => (
						<GroupCard
							key={group._id}
							name={group.groupName}
						/>
					))}


					{/* <GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard />
					<GroupCard /> */}

				</div>

			</div>

		</>);
	}
}

export default Search;