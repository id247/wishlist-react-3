import * as actions from '../actions/error';

export function error(state = 'unknown', action) {
	switch (action.type) {
		case actions.ERROR_SET:
			return action.payload;
		default:
			return state
	}
}


