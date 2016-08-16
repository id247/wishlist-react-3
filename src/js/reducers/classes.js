import { combineReducers } from 'redux';

import * as actions from '../actions/classes';


export function list(state = [], action) {
	switch (action.type) {
		case actions.CLASSES_SET_LIST:
			return action.payload;
		default:
			return state
	}
}

export const classes = combineReducers({
	list,
});
