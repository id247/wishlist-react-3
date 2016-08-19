import API from '../api/api';
import OAuth from '../api/oauth';
import XML from '../api/xml';

import * as initActions from '../actions/init';
import * as pageActions from '../actions/page';
import * as loadingActions from '../actions/loading';
import * as errorActions from '../actions/error';
import * as userActions from '../actions/user';
import * as xmlActions from '../actions/xml';


//error handler

export function catchError(err){
	return dispatch => {
		if (err.description){	
			console.error(err.message,':', err.description);
		}else{
			console.error(err);
		}
		switch(err.message){
			case 'Unauthorized' :				
				//dispatch(logout());
				//dispatch(pageActions.setPageWithoutHistory('login'));
				break;

			default:
				//dispatch(errorActions.setError(err.message));
				//dispatch(pageActions.setPageWithoutHistory('error'));
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


export function postToWallAfretLogin(formData) {
	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {
			return getUserInfoPromise();
		})
		.then( data => {
			dispatch(getUserInfo(data));
		})
		.then( () => {
			const profile = getState().user.profile;
			
			//if still not loged in
			if (!profile){
				throw new Error('No profile');
			}
			
			dispatch(postToWall(profile.id_str, formData));
		})
		.then( () => {
			dispatch(loadingActions.loadingHide());	
		},(err) => {
			console.error(err);
			dispatch(loadingActions.loadingHide());
		});
	}
}


//messages

export function sendMessage(data){
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return API.sendMessage(data)
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

export function postToWall(userId, formData){
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return API.postToWall(userId, formData)
		.then( (res) => {
			console.log(res);
			if (res === 'ok'){
				console.log('Сохранили на стеночку');
			}	
		})
		.then( () => {

			dispatch(loadingActions.loadingHide());
		})
		.catch( err => { 
			dispatch(catchError(err)); 
		});
	}
}


export function postToWallWithLogin(formData){
	return (dispatch, getState) => {

		const profile = getState().user.profile;

		//if not loged in
		if (profile){
			dispatch(postToWall(profile.id_str, formData));
		}else{
			dispatch(postToWallAfretLogin(formData));
		}

	}
}


function getUserInfoPromise() {	
	const p0 = API.getUser();
	const p1 = API.getUserFriends();
	const p2 = API.getUserRelatives();	
	return Promise.all([p0,p1,p2]);
}


export function getUserInfo(data) {
	return dispatch => {
		console.log(data);
		const user = data[0];
		const friends = data[1];
		const relatives = data[2];

		dispatch(userActions.userSet(user));
		dispatch(userActions.userFriendsSet(friends));
		dispatch(userActions.userRelativesSet(relatives));
	}
}

//xml


export function getXml() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return XML.getXML()
		.then( xml => {
			dispatch(xmlActions.xmlProductsAdd(xml.products));
 			dispatch(xmlActions.xmlCategoriesAdd(xml.categories));
 			dispatch(xmlActions.xmlActiveCategorySet(xml.categories[0].id));

 			dispatch(initActions.apiInitialDataLoaded());

 			return getUserInfoPromise();
		})
		.then( data => {
			dispatch(getUserInfo(data));
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
		return dispatch(getXml());	
	}
}

