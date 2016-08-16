import { combineReducers } from 'redux';

import * as actions from '../actions/schools';


export function list(state = [], action) {
	switch (action.type) {
		case actions.SCHOOLS_SET_LIST:
			return action.payload;
		default:
			return state
	}
}

export function current(state = 0, action) {
	switch (action.type) {
		case actions.SCHOOLS_SET_CURRENT:
			return 	action.payload;		
		default:
			return state;
	}
}


export const schools = combineReducers({
	list,
	current,
});
