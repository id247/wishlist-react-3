import { combineReducers } from 'redux';

import * as actions from '../actions/init';

export function isInitialDataLoaded(state = false, action) {
	switch (action.type) {
		case actions.API_INITIAL_DATA_LOADED:
			return 	true;
		default:
			return state;
	}
}

export const init = combineReducers({
	isInitialDataLoaded,
});
