import React from 'react';
import { connect } from 'react-redux';


import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';

//class WishlistShare extends React.Component {
//
//	render(){
//		return(
//			<div className={( (props.mixClass ? props.mixClass : '') + ' class')} id="class">
//			</div>
//		);
//	}
//}

const WishlistShare = (props) => (
	<div className={( (props.mixClass ? props.mixClass : '') + ' wishlist-share')}>

		<div className="wishlist-share__button-placeholder">

			<Button
				size="m"
				color="yellow"
				//clickHandler={}
			>
				Поделиться
			</Button>

		</div>

		<ul className="wishlist-share__list">

			<li className="wishlist-share__item">

				<Checkbox
					name="parents"
					value="true"
					checked={true}
					onChangeHandler={() => {}}
				>
					С родителями
				</Checkbox>

			</li>

			<li className="wishlist-share__item">

				<Checkbox
					name="friends"
					value="true"
					checked={true}
					onChangeHandler={() => {}}
				>
					С друзьями
				</Checkbox>

			</li>

		</ul>

	</div>
);

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
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
