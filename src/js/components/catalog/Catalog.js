import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as wishlistActions from '../../actions/wishlist';

import CatalogItem from './CatalogItem';

const Catalog = (props) => (
	<div className={( (props.mixClass ? props.mixClass : '') + ' catalog')} id="catalog">

		<ul className="catalog__list">

			{props.products && props.products.map((product, i) => (
				<CatalogItem 
					key={i}	
					mixClass="catalog__item"
					product={product} 
					isAddedToWishlist={props.wishlist.indexOf(product) > -1} 
					addToWishlistHandler={(e) =>{
						e.preventDefault();
						props.addToWishlist(product);
					}} 
				/>
			))}

		</ul>

	</div>
);

Catalog.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	//filter product by active category
	products: state.xml.products.filter( product => (
		product.categories.indexOf( state.xml.activeCategory ) > -1 
	)),
	wishlist: state.wishlist,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	addToWishlist: (product) => {
		dispatch(wishlistActions.wishlistAddProduct(product));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
