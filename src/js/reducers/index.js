import { combineReducers } from 'redux';

import { init } from './init';
import { page } from './page';
import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { users } from './users';

const rootReducer = combineReducers({
	init,
	page,
	error,
	user,
	users,
});

export default rootReducer;
