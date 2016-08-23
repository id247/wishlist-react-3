import { combineReducers } from 'redux';

import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { xml } from './xml';
import { wishlist } from './wishlist';
import { share } from './share';

const rootReducer = combineReducers({
	error,
	loading,
	user,
	xml,
	wishlist,
	share,
});

export default rootReducer;
