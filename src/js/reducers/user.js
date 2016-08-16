// import { combineReducers } from 'redux';

import * as actions from '../actions/user';


export function user(state = false, action) {
	switch (action.type) {
		case actions.USER_SET:
			return 	action.payload;			
		case actions.USER_UNSET:
			return 	false;
		default:
			return state;
	}
}

// export const profile = combineReducers({
// 	user,
// });
