import { combineReducers } from 'redux';

import { init } from './init';
import { page } from './page';
import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { xml } from './xml';
import { wishlist } from './wishlist';
import { share } from './share';

const rootReducer = combineReducers({
	init,
	page,
	error,
	loading,
	user,
	xml,
	wishlist,
	share,
});

export default rootReducer;
