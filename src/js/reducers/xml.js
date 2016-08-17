import { combineReducers } from 'redux';

import * as actions from '../actions/xml';


export function products(state = [], action) {
	switch (action.type) {
		case actions.XML_PRODUCTS_ADD:
			return action.payload;			
		default:
			return state;
	}
}
export function categories(state = [], action) {
	switch (action.type) {
		case actions.XML_CATEGORIES_ADD:
			return action.payload;			
		default:
			return state;
	}
}

export function activeCategory(state = 0, action) {
	switch (action.type) {
		case actions.XML_ACTIVE_CATEGORY_SET:
			return action.payload;			
		default:
			return state;
	}
}

export const xml = combineReducers({
	products,
	categories,
	activeCategory,
});
