// import { combineReducers } from 'redux';

import * as actions from '../actions/wishlist';

export function wishlist(state = [], action) {
	switch (action.type) {
		case actions.WISHLIST_ADD_ITEMS:
			return  action.payload;
		
		case actions.WISHLIST_ADD_ITEM:
			return 	[...state, action.payload];
		
		case actions.WISHLIST_DELETE_ITEM:	
			return 	state.filter( (product) => ( product.id !== action.payload ) ); 

		default:
			return state;
	}
}

// export const wishlist = combineReducers({
// 	ids,
// 	products,
// 	//ozonLink,
// });
