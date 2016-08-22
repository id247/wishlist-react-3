import API from '../api/api';
import OAuth from '../api/hello';
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

		switch(err.message){
			case 'Unauthorized':
				dispatch(logout());
				break;
		}
	}
}

// authorisation

export function login() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {
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
	}
}

export function doActionAfterLogin(callback) {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( getUserDataPromises )
		.then( data => {
			dispatch(setUserData(data));
		})
		.then( () => {
			callback();
		})
		.then( () => {
			dispatch(loadingActions.loadingHide());	
		},(err) => {
			dispatch(catchError(err)); 	
			dispatch(loadingActions.loadingHide());
		});
	}
}


//messages

export function sendInvites(sendToFriends = true, sendToRelatives = true){
	return (dispatch, getState) => {

		const state = getState();

		if (!state.user.profile){ //login first
			dispatch(doActionAfterLogin( ()=> {
				dispatch(sendInvites(sendToFriends, sendToRelatives));
			}));
			return;
		}

		const messagesArray = messagesHelpers.createMessagesArray(state, sendToFriends, sendToRelatives);

		if (messagesArray.length === 0){
			console.log('no messages');
			return false;
		}
		
		const sendInvitesPromises = messagesArray.map( messages => API.sendInvites(messages) );

		dispatch(shareActions.shareMessageClearAll('messages'));

		return Promise.all(sendInvitesPromises)
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

//wall

export function postToWall(){
	return (dispatch, getState) => {

		const state = getState();

		if (!state.user.profile){ //login first
			dispatch(doActionAfterLogin( ()=> {
				dispatch(postToWall());
			}));
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

//user

function getUserDataPromises() {	
	const p0 = API.getUser();
	const p1 = API.getUserFriendsIds();
	const p2 = API.getUserRelatives();	
	return Promise.all([p0,p1,p2]);
}

export function setUserData(data) {
	return dispatch => {
		console.log(data);
		const user = data[0];
		const friends = data[1];
		const relatives = data[2];

		dispatch(userActions.userSet(user));
		dispatch(userActions.userFriendsIdsSet(friends));
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

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return XML.getXML()
		.then( xml => {
			dispatch(setXmlData(xml));
 			dispatch(initActions.apiInitialDataLoaded());

 			return getUserDataPromises();
		})
		.then( data => {
			const friendsIds = data[1];
			const getUserPromises = friendsIds.map( friendId => API.getUser(friendId) );
			
			dispatch(setUserData(data));

			return Promise.all(getUserPromises);
			//return API.getUsers(friendsIds);
		})
		.then( (friends) => {		
			dispatch(userActions.userFriendsSet(friends));
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

