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
	return dispatch => {	
		console.error(err.message,':', err.description);
		switch(err.message){
			case 'Unauthorized' :				
				dispatch(logout());
				dispatch(pageActions.setPageWithoutHistory('login'));
				break;

			case 'ResourceUnavailable' :
				//?
				break;

			case 'Bad Request' :
				//?
				break;

			default:
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
		dispatch(initActions.apiInitialDataDelete());
		dispatch(pageActions.setPageWithoutHistory('login'));
	}
}


//messages

export function sendInvites(data){
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return API.sendInvites(data)
		.then( (res) => {
			console.log(res);
		})
		.then( () => {

			dispatch(loadingActions.loadingHide());
		})
		.catch( err => { 
			dispatch(catchError(err)); 
		});
	}
}

//wall

export function postToWall(userId, data){
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return API.postToWall(userId, data)
		.then( (res) => {
			console.log(res);
		})
		.then( () => {

			dispatch(loadingActions.loadingHide());
		})
		.catch( err => { 
			dispatch(catchError(err)); 
		});
	}
}


//init

export function init() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());	
		
		const p0 = API.getUser();
		const p1 = API.getUserFriends();
		const p2 = API.getUserRelatives();

		return XML.getXML()
		.then( xml => {
			dispatch(xmlActions.xmlProductsAdd(xml.products));
 			dispatch(xmlActions.xmlCategoriesAdd(xml.categories));
 			dispatch(xmlActions.xmlActiveCategorySet(xml.categories[0].id));

			return Promise.all([p0,p1,p2]);
		})
		.then( values => {
			console.log(values);
			const user = values[0];
			const friends = values[1];
			const relatives = values[2];

			dispatch(userActions.userSet(user));
			dispatch(userActions.userFriendsSet(friends));
			dispatch(userActions.userRelativesSet(relatives));
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

