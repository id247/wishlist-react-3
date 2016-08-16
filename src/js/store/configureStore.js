import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
//import loadingMiddleware from '../middlewares/loadingMiddleware';

import rootReducer from '../reducers/index';

const configureStore = () => {

	const store = createStore(	rootReducer, 
								applyMiddleware(
									thunkMiddleware,
									//loadingMiddleware,
									loggerMiddleware({collapsed: true}),
								)	
							);
	return store;
}

export default configureStore;
