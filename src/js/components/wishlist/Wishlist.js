import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WishlistEmpty from './WishlistEmpty';
import WishlistFull from './WishlistFull';
import WishlistCart from './WishlistCart';

import * as wishlistActions from '../../actions/wishlist';

class Wishlist extends React.Component {
	
	constructor(props){
    	super(props);
    	this._updateCartVisibility = this._updateCartVisibility.bind(this);  
    	this._scrollToWishlist = this._scrollToWishlist.bind(this);  
	}

	componentWillMount() {
		this.props.wishlistGetFromCookies();
	}

	componentDidMount() {
		document.addEventListener('scroll', this._updateCartVisibility);
	}

	componentDidUpdate() {
		this._updateCartVisibility();
		this._popCart();
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this._updateCartVisibility);
	}

	_scrollToWishlist(e) {
		e.stopPropagation();
		e.preventDefault();
		
		function scrollTo(element, to, duration) {
			if (duration <= 0) return;
			var difference = to - element.scrollTop;
			var perTick = difference / duration * 10;

			setTimeout(function() {
				element.scrollTop = element.scrollTop + perTick;
				if (element.scrollTop === to) return;
				scrollTo(element, to, duration - 10);
			}, 10);
		}

		scrollTo(document.body, 0, 600);

	}
	
	_updateCartVisibility() {
		const cart = this.refs.cart;
				
		if (!cart){
			//return;
		}

		const listBottom = this.refs.wishlist.getBoundingClientRect().bottom;
		const cartTop = cart.getBoundingClientRect().top;
		
		if (listBottom + 100 > cartTop){
			cart.classList.remove('wishlist__cart--visible');
		}else{
			cart.classList.add('wishlist__cart--visible');			
		}
	}

	_popCart(){
		const cart = this.refs.cart;
		cart.classList.add('wishlist__cart--pop');
		setTimeout( () => {
			cart.classList.remove('wishlist__cart--pop');
		}, 300);
	}

	render() {
		const { props } = this;
		const content = props.totalCount > 0 ? <WishlistFull /> : <WishlistEmpty /> 
		return (
			<div className={( (props.mixClass ? props.mixClass : '') + ' wishlist')} id="wishlist" ref="wishlist">

				<h3 className="wishlist__title">
					ДОБАВЛЕННЫЕ ТОВАРЫ
					<span className="wishlist__counter">
						{props.totalCount}
					</span>
				</h3>

				<div className="wishlist__content">
					
					{content}
				
				</div>

				<div className="wishlist__cart" ref="cart">
					<WishlistCart 
						totalCount={props.totalCount}
						onClickHandler={this._scrollToWishlist}
					/>
				</div>

			</div>
		);
	}
};

Wishlist.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	totalCount: parseInt(state.wishlist.length),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	wishlistGetFromCookies: () => dispatch(wishlistActions.wishlistGetFromCookies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
