import { combineReducers } from 'redux';

import { init } from './init';
import { page } from './page';
import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { xml } from './xml';
import { wishlist } from './wishlist';

const rootReducer = combineReducers({
	init,
	page,
	error,
	xml,
	wishlist,
});

export default rootReducer;
