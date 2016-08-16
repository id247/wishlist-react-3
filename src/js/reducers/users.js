import { combineReducers } from 'redux';

import * as actions from '../actions/users';
import * as immutations from '../helpers/immutations';

export function list(state = ['', '', ''], action) {
	switch (action.type) {
		case actions.USERS_LIST_ADD:
			return 	immutations.addToArray(state, action.payload);

		case actions.USERS_LIST_DELETE:
			return 	immutations.deletFromArray(state, action.payload);

		case actions.USERS_LIST_UPDATE:
			return 	immutations.updateInArray(state, action.payload.index, action.payload.value);

		case actions.USERS_LIST_RESET:
		case actions.USERS_UNSET:
			return 	['', '', ''];
		default:
			return state;
	}
}

export const users = combineReducers({
	list,
});
