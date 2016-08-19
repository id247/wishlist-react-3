import { combineReducers } from 'redux';

import * as actions from '../actions/share';


export function loading(state = {}, action) {
	switch (action.type) {
		case actions.SHARE_LOADING_SHOW:
			return 	{...state, ...{[action.payload]: true}};
		case actions.SHARE_LOADING_HIDE:
			return 	{...state, ...{[action.payload]: false}};;
		default:
			return state;
	}
}
export function message(state = {}, action) {
	switch (action.type) {
		case actions.SHARE_MESSAGE_ADD:
			return 	{...state, ...{[action.payload.shareId]: action.payload.message}};
		default:
			return state;
	}
}


export const share = combineReducers({
	loading,
	message,
});
