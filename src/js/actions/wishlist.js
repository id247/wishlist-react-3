import cookies from 'js-cookie';
const cookieName = 'ozon_wishlist';

import parse from 'url-parse';

import * as shareActions from '../actions/share';

export const WISHLIST_ADD_ITEM 	= 'WISHLIST_ADD_ITEM';
export const WISHLIST_ADD_ITEMS 	= 'WISHLIST_ADD_ITEMS';
export const WISHLIST_DELETE_ITEM 	= 'WISHLIST_DELETE_ITEM';

export function wishlistAddItems(products) {
	return{
		type: WISHLIST_ADD_ITEMS,
		payload: products
	}
};

export function wishlistAddItem(product) {
	return{
		type: WISHLIST_ADD_ITEM,
		payload: product
	}
};

export function wishlistDeleteItem(productId) {
	return {
		type: WISHLIST_DELETE_ITEM,
		payload: productId
	}
}

export function wishlistGet() {

	function getCookies(){
		return cookies.get(cookieName);
	}

	function getWishlist(){

		const url = parse(location.href, true);
		const urlWishlist = url.query.wishlist;
		const cookiesWishlist = getCookies();

		if (urlWishlist){
			return urlWishlist.split(',');
		}

		if (cookiesWishlist){
			return cookiesWishlist.split(',');
		}

		return [];
	}

	function filterWishlist(wishlist, products){
		const tempWishlist = wishlist.map(id => parseInt(id));

		//only ids wich are in store
		return products.filter( product => (tempWishlist.indexOf(parseInt(product.id)) > -1) );
	}

	return (dispatch, getState) => {
		let products = getState().xml.products;
		let wishlist = getWishlist();
		products = filterWishlist(wishlist, products);
		dispatch(wishlistAddItems(products));
	}
}


export function wishlistSetCookies() {

	function setCookies(wishlistIds){
		if ( wishlistIds.length > 0){
			cookies.set(cookieName, wishlistIds.toString(), { expires: 100, path: ''});
		}else{
			cookies.set(cookieName, false, { expires: -1, path: ''});
		}			
	}

	return (dispatch, getState) => {
		const wishlistIds = getState().wishlist.map( item => item.id);
		setCookies(wishlistIds);
	}
}

export function wishlistAddProduct(product) {
	return (dispatch, getState) => {
		dispatch(wishlistAddItem(product));
		dispatch(wishlistSetCookies());
		dispatch(shareActions.shareMessageClearAll());
	}
}
export function wishlistDeleteProduct(product) {
	return (dispatch, getState) => {
		dispatch(wishlistDeleteItem(product));
		dispatch(wishlistSetCookies());
		dispatch(shareActions.shareMessageClearAll());
	}
}
