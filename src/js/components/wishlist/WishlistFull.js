import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import parse from 'url-parse';

import * as wishlistActions from '../../actions/wishlist';

import WishlistItem from './WishlistItem';
import WishlistBuyButton from './WishlistBuyButton';
import WishlistShare from './WishlistShare';

const WishlistFull = (props) => {
	
	const url = parse(location.href, true);
	const isForParent = url.query.parent;

	const actions = isForParent
					? <WishlistBuyButton ozonLink={props.ozonLink} />
					: <WishlistShare mixClass="wishlist__share" />
	return(
		<div className="wishlist__full">

			<ul className="wishlist__list">
				
				{props.wishlist && props.wishlist.map((product, i) => (
					<WishlistItem 
						key={i}	
						mixClass="wishlist__item"
						product={product} 
						removeFromWishlistHandler={(e) => {
							e.preventDefault();
							props.removeFromWishlist(product.id);						
						}} 
					/>
				))}

			</ul>

			{actions}

		</div>
	);
}

WishlistFull.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
	ozonLink: 'http://www.OZON.ru/?context=cart&id=' + state.wishlist.map( item => item.id).join(',') +  '&partner=dnevnik_ru',
	wishlist: state.wishlist,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	removeFromWishlist: (productId) => {
		dispatch(wishlistActions.wishlistDeleteProduct(productId));		
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(WishlistFull);
