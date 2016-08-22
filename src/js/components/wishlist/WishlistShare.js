import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

import URLSearchParams from 'url-search-params';
import { PromoOptions } from 'appSettings';

import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';

import ShareResult from '../../components/wishlist/share/ShareResult';

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
		this.props.sendInvites(this.state.friends, this.state.relatives);
	}

	postToWall(){
		this.props.postToWall();
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
						disabled={(!state.relatives && !state.friends && !props.share.loading.messages)}
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

				<ShareResult 
					mixClass="wishlist-share__message"
					share='messages'
					status={props.share.message.messages}
					userId={props.user.profile.id_str}
					server={PromoOptions.server}
				/>

				<div className="wishlist-share__button-placeholder">

					<Button
						size="m"
						color="yellow"
						block={true}
						disabled={props.share.loading.wall}
						onClickHandler={this.postToWallHandler()}
					>
						Сохранить на стену
					</Button>

				</div>

				<ShareResult 
					mixClass="wishlist-share__message"
					share='wall'
					status={props.share.message.wall}
					userId={props.user.profile.id_str}
					server={PromoOptions.server}
				/>

			</div>		
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	user: state.user,
	share: state.share,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	sendInvites: (sendToFriends, sendToRelatives) => dispatch(asyncActions.sendInvites(sendToFriends, sendToRelatives)),
	postToWall: () => dispatch(asyncActions.postToWall()),
});

WishlistShare.propTypes = {
	mixClass: React.PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistShare);
