import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

import URLSearchParams from 'url-search-params';

import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';

class WishlistShare extends React.Component {

	constructor(){
		super();

		this.state = {
			friends: true,
			relatives: true,
		}
	}

	updateCheckbox(checkboxId){
		this.setState({ 
			[checkboxId]: !this.state[checkboxId], 
		});
	}

	submitInvites(){		
		this.props.sendInvitesWithLogin(this.state.friends, this.state.relatives);
	}

	postToWall(){
		this.props.postToWallWithLogin();
	}

	//event handlers

	chekboxChangeHandler = (checkboxId) => (e) => {
		this.updateCheckbox(checkboxId);
	}

	submitInvitesHandler = () => (e) => {
		e.preventDefault();
		this.submitInvites();
	}

	postToWallHandler = () => (e) => {
		e.preventDefault();
		this.postToWall();
	}


	render(){
		const { props, state } = this;

		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' wishlist-share')}>

				<div className="wishlist-share__button-placeholder">

					<Button
						size="m"
						color="yellow"
						block={true}
						disabled={(!state.relatives && !state.friends)}
						onClickHandler={this.submitInvitesHandler()}
					>
						Поделиться
					</Button>

				</div>

				<ul className="wishlist-share__list">

					<li className="wishlist-share__item">

						<Checkbox
							name="parents"
							value="true"
							checked={state.relatives}
							onChangeHandler={this.chekboxChangeHandler('relatives')}
						>
							С родителями
						</Checkbox>

					</li>

					<li className="wishlist-share__item">

						<Checkbox
							name="friends"
							value="true"
							checked={state.friends}
							onChangeHandler={this.chekboxChangeHandler('friends')}
						>
							С друзьями
						</Checkbox>

					</li>

				</ul>

				<div className="wishlist-share__button-placeholder">

					<Button
						size="m"
						color="yellow"
						block={true}
						onClickHandler={this.postToWallHandler()}
					>
						Сохранить на стену
					</Button>

				</div>

			</div>		
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	sendInvitesWithLogin: (sendToFriends, sendToRelatives) => dispatch(asyncActions.sendInvitesWithLogin(sendToFriends, sendToRelatives)),
	postToWallWithLogin: (data) => dispatch(asyncActions.postToWallWithLogin(data)),
});

WishlistShare.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistShare);
