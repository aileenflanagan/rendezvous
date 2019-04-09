import React from "react";
import {  Link } from "react-router-dom";
import "./style.css";

function GroupCard(props) {;
	return (
    
		<div className="group-card-container">
			{props.groups.map(group => (
				
				<div key={group._id} className="group-cards">
					<img id="img-container" alt="" src="https://www.akc.org/wp-content/themes/akc/component-library/assets/img/register.jpg"/>
					<h4 className="group-names">{group.groupName}</h4>

					{/* Passes the groupId to the group page and renders it */}
					<Link
						id={group._id}
						to={"/group/" + group._id}
					>View this group
					</Link>
					
				</div>
			))}


		</div>
	);
}

export default GroupCard;