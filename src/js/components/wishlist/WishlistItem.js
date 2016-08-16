import React from 'react';

import CatalogImage from '../../components/catalog/CatalogImage';
import CatalogPrice from '../../components/catalog/CatalogPrice';

const WishlistItem = (props) => (
	<div className={( (props.mixClass ? props.mixClass : '') + ' wishlist-item')}>

		<div className="wishlist-item__image">
			
			<CatalogImage
				src={props.product.image} 
				alt={props.product.title}
			/>

		</div>

		<div className="wishlist-item__content">

			<button 
				className="wishlist-item__delete js-wishlist-delete"
				onClick={props.removeFromWishlistHandler}
			>
				&times;
			</button>

			<h3 className="wishlist-item__title">
				{props.product.title}
			</h3>

			<CatalogPrice 
				mixClass="wishlist-item__price"
				price={parseInt(props.product.price)} 
				currency={props.product.currency} 
				shopName={props.product.shopName} 
				shopId={props.product.shopId} 
				shopUrl={props.product.link} 
			/>

		</div>

	</div>
);

WishlistItem.propTypes = {
	mixClass: React.PropTypes.string,
	product: React.PropTypes.object.isRequired,
	removeFromWishlistHandler: React.PropTypes.func.isRequired,
};

export default WishlistItem;
