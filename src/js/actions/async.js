import API from '../api/api';
import OAuth from '../api/oauth';
import XML from '../api/xml';

import * as initActions from '../actions/init';
import * as pageActions from '../actions/page';
import * as loadingActions from '../actions/loading';
import * as errorActions from '../actions/error';
import * as userActions from '../actions/user';
import * as xmlActions from '../actions/xml';
import * as shareActions from '../actions/share';

import * as messagesHelpers from '../helpers/messages';


//error handler

export function catchError(err){
	return dispatch => {
		if (err.description){	
			console.error(err.message,':', err.description);
		}else{
			console.error(err);
		}
	}
}

// authorisation

export function login() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {
			//dispatch(pageActions.setPageWithoutHistory('index'));
			dispatch(loadingActions.loadingHide());	
		},(err) => {
			dispatch(catchError(err));
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

export function sendInvites(sendToFriends = true, sendToRelatives = true){
	return (dispatch, getState) => {

		const state = getState();

		if (!state.user.profile){ //login first
			dispatch(sendInvitesAfterLogin(sendToFriends, sendToRelatives));
			return;
		}

		const messagesArray = messagesHelpers.createMessagesArray(state, sendToFriends, sendToRelatives);

		if (messagesArray.length === 0){
			console.log('no messages');
			return false;
		}
		
		const promises = [];

		messagesArray.map( messages => {
			promises.push(API.sendInvites(messages));
		});

		dispatch(shareActions.shareMessageClearAll('messages'));

		return Promise.all(promises)
		.then( (results) => {
			dispatch(shareActions.shareMessageAdd('messages', 'Сообщения отправлены'));
		})
		.then( () => {
			dispatch(shareActions.shareLoadingHide('messages'));
		})
		.catch( err => { 
			dispatch(catchError(err)); 
			dispatch(shareActions.shareLoadingHide('messages'));
			dispatch(shareActions.shareMessageAdd('messages', 'Ошибка, попробуйте еще раз'));
		});
	}
}

export function sendInvitesAfterLogin(sendToFriends, sendToRelatives) {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {
			return getUserDataPromises();
		})
		.then( data => {
			dispatch(setUserData(data));
		})
		.then( () => {
			dispatch(sendInvites(sendToFriends, sendToRelatives));
		})
		.then( () => {
			dispatch(loadingActions.loadingHide());	
		},(err) => {
			dispatch(catchError(err)); 	
			dispatch(loadingActions.loadingHide());
		});
	}
}


//wall

export function postToWall(){
	return (dispatch, getState) => {

		const state = getState();

		if (!state.user.profile){ //login first
			dispatch(postToWallAfterLogin());
			return;
		}

		const formData = messagesHelpers.createMessageToWall(state);

		dispatch(shareActions.shareLoadingShow('wall'));
		
		return API.postToWall(state.user.profile.id_str, formData)
		.then( (res) => {
			if (res !== 'ok'){
				throw new Error('post to wall fail - no ok');
			}	
			dispatch(shareActions.shareMessageAdd('wall', 'Сохранили на стеночку'));
		})
		.then( () => {
			dispatch(shareActions.shareLoadingHide('wall'));
		})
		.catch( err => { 
			dispatch(catchError(err)); 
			dispatch(shareActions.shareLoadingHide('wall'));
			dispatch(shareActions.shareMessageAdd('wall', 'Ошибка, попробуйте еще раз'));
		});
	}
}


export function postToWallAfterLogin() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {
			return getUserDataPromises();
		})
		.then( data => {
			dispatch(setUserData(data));
		})
		.then( () => {
			dispatch(postToWall());
		})
		.then( () => {
			dispatch(loadingActions.loadingHide());	
		},(err) => {
			dispatch(catchError(err)); 
			dispatch(loadingActions.loadingHide());
		});
	}
}

//user

export function setUserData(data) {
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

export function setXmlData(xml) {
	return dispatch => {
		dispatch(xmlActions.xmlProductsAdd(xml.products));
 		dispatch(xmlActions.xmlCategoriesAdd(xml.categories));
 		dispatch(xmlActions.xmlActiveCategorySet(xml.categories[0].id));
	}
}

//init

export function getInitialData() {

	function getUserDataPromises() {	
		const p0 = API.getUser();
		const p1 = API.getUserFriends();
		const p2 = API.getUserRelatives();	
		return Promise.all([p0,p1,p2]);
	}

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return XML.getXML()
		.then( xml => {
			dispatch(setXmlData(xml));
 			dispatch(initActions.apiInitialDataLoaded());

 			return getUserDataPromises();
		})
		.then( data => {
			dispatch(setUserData(data));
		})
		.then( () => {			
			dispatch(loadingActions.loadingHide());
		})
		.catch( err => { 
			dispatch(catchError(err)); 
			dispatch(loadingActions.loadingHide());
		});
	}
}

export function init() {
	return dispatch => {
		return dispatch(getInitialData());	
	}
}

