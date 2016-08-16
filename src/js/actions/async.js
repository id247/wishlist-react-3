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

//user

export function getUser(userId) {
	return dispatch => {	
		dispatch(loadingActions.loadingShow());
				
		return API.getUser(userId)
		.then( user => {
			dispatch(loadingActions.loadingHide());
		})
		.catch( err => {
			dispatch(loadingActions.loadingHide());
		});
	}
}

export function setUser(user){
	return dispatch => {	
		if (!user){
			throw new Error('no-user');
		}
		dispatch(userActions.userSet(user));	
	}
}


//init

export function init() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());	
		
		return API.getUser('me')
		.then( user => {
			dispatch(setUser(user));
			return XML.getXML();
		})
		.then( payload => {
			dispatch(xmlActions.xmlProductsAdd(payload.products));
 			dispatch(xmlActions.xmlCategoriesAdd(payload.categories));

 			dispatch(xmlActions.xmlActiveCategorySet(payload.categories[0].id));
 			
			dispatch(initActions.apiInitialDataLoaded());
			dispatch(loadingActions.loadingHide());
		})
		.catch( err => {
			dispatch(catchError(err));
		});
	}
}

