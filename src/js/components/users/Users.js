import React from 'react';
import { connect } from 'react-redux';

import * as apiActions from '../../actions/api';

class Users extends React.Component {

	constructor(props){
		super(props);
	}

	addListItemHandler = () => (e) => {
		e.preventDefault();
		this.addListItem();
	}

	getUser = (userId) => (e) => {
		e.preventDefault();
		this.props.getUser(userId);
	}
	
	render(){
		const { props } = this;

		return(
			<div>
				<button onClick={this.getUser(100)} >get user 100</button>
				<button onClick={this.getUser(200)} >get user 200</button>	
				<button onClick={this.getUser(300)} >get user 300</button>	

				<ul>
				{props.users.map( (user, i) => (
					<li key={i}>
						{user.fullName}
					</li>
				))}
				</ul>
			</div>
		);
	}
}

Users.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
	users: state.users.list,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	getUser: (userId) => dispatch(apiActions.usersGetUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
