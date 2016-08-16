// import { combineReducers } from 'redux';

import * as actions from '../actions/wishlist';

function isCorrectItem(item){
	return ( 	typeof item === 'object' 
				&& item.id
				&& Number.isInteger(item.id)
			);
}

export function wishlist(state = [], action) {
	switch (action.type) {
		case actions.WISHLIST_ADD_ITEMS:
			if (!Array.isArray(action.payload)){
				return state;
			}
			const items = action.payload.filter( item => isCorrectItem(item) );
			return 	[...state, ...items];
		
		case actions.WISHLIST_ADD_ITEM:
			if (!isCorrectItem(action.payload)){
				return state;
			}
			return 	[...state, action.payload];
		
		case actions.WISHLIST_DELETE_ITEM:
			if (!Number.isInteger(action.payload)){
				return state;
			}		
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
