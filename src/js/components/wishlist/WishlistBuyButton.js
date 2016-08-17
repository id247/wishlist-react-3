import React from 'react';

const WishlistBuyButton = (props) => (
	<div className="wishlist__button-placeholder">

		<a 	href={props.ozonLink} 
			className="wishlist__button button button--yellow button--m" 
			target="_blank"
		>
			Купить на OZON.RU
		</a>

	</div>
);

WishlistBuyButton.propTypes = {
	ozonLink: React.PropTypes.string.isRequired,
};

export default WishlistBuyButton;
