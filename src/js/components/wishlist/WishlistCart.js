import React from 'react';

const WishlistCart = (props) => (
	<a 	href="#wishlist" 
		className="wishlist-cart"
		onClick={props.onClickHandler}
	>
		<div className="wishlist-cart__counter">
			{props.totalCount}
		</div>
		<div className="wishlist-cart__text">
			К списку
		</div>
	</a>
);

WishlistCart.propTypes = {
	totalCount: React.PropTypes.number.isRequired,
	onClickHandler: React.PropTypes.func.isRequired,
};

export default WishlistCart;
