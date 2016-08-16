import { OAuth, API } from '../async/api';
import XML from '../async/xml';

import * as initActions from '../actions/init';
import * as pageActions from '../actions/page';
import * as loadingActions from '../actions/loading';
import * as errorActions from '../actions/error';
import * as userActions from '../actions/user';
import * as xmlActions from '../actions/xml';


//error handler

export function catchError(err){
	console.error(err);
	return dispatch => {	
		if (err.message === 'Unauthorized'){
			dispatch(logout());
			dispatch(pageActions.setPageWithoutHistory('login'));
		}else{
			dispatch(errorActions.setError(err.message));
			dispatch(pageActions.setPageWithoutHistory('error'));
		}
		dispatch(loadingActions.loadingHide());
	}
}

// authorisation

export function login() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {
			dispatch(pageActions.setPageWithoutHistory('index'));
			dispatch(loadingActions.loadingHide());	
		},(err) => {
			console.error(err);
			dispatch(loadingActions.loadingHide());
		});
	}
}

export function logout() {
	return dispatch => {
		OAuth.logout();
		dispatch(userActions.userUnset());
		dispatch(pageActions.setPageWithoutHistory('login'));
	}
}


//init

export function init() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());	
		
		const p0 = API.getUser();
		const p1 = API.getUserFrients();
		const p2 = API.getUserRelatives();
		const p3 = XML.getXML();

		return Promise.all([p0,p1,p2,p3])
		.then( values => {
			const user = values[0];
			const friends = values[1];
			const relatives = values[2];
			const xml = values[3];

			dispatch(userActions.userSet(user));
			dispatch(userActions.userFriendsSet(friends));
			dispatch(userActions.userRelativesSet(relatives));

			dispatch(xmlActions.xmlProductsAdd(xml.products));
 			dispatch(xmlActions.xmlCategoriesAdd(xml.categories));

 			dispatch(xmlActions.xmlActiveCategorySet(xml.categories[0].id));
		})
		.then( () => {
			dispatch(initActions.apiInitialDataLoaded());
			dispatch(loadingActions.loadingHide());
		})
		.catch( err => { 
			dispatch(catchError(err)); 
		});
	}
}

