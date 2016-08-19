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

export function sendInvites(sendToFriends = true, sendToRelatives = true){
	return (dispatch, getState) => {

		const promises = [];

		const state = getState();
		const { profile, friends, relatives } = state.user;
		const wishlistIds = state.wishlist.map( item => item.id);
		
		const relativesIds = relatives.map( relative => relative.person.userId );
		const friendsIds = friends;
		
		const serviceUrl = 'http://localhost:9000';
		const wishlistUrl = wishlistIds.join(',');

		const relativesText = 'Текст о том что создан список и <a href="' + serviceUrl + '?wishlist=' + wishlistUrl + '&parent=true">ссылка</a>';
		const friendsText = 'Текст о том что создан список и <a href="' + serviceUrl + '?wishlist=' + wishlistUrl + '">ссылка</a>';

		const messagesArray = [];
		
		function createMessages(peopleIds, message){
			const formData = new URLSearchParams();
			peopleIds.map( (id, i) => {
				formData.append('userIDs[' + i + ']', id);
			});		
			formData.append('message', message);

			return formData;
		}

		if (sendToRelatives === true && relativesIds.length > 0){
			messagesArray.push(createMessages(relativesIds, relativesText));
		}

		if (sendToFriends && friendsIds.length > 0){
			messagesArray.push(createMessages(friendsIds, friendsText));
		}

		console.log(relativesIds);
		console.log(friendsIds);
		console.log(messagesArray);

		if (messagesArray.length === 0){
			return false;
		}

		messagesArray.map( messages => {
			promises.push(API.sendInvites(messages));
		});


		dispatch(loadingActions.loadingShow());

		return Promise.all(promises)
		.then( (results) => {
			console.log(results);
		})
		.then( () => {

			dispatch(loadingActions.loadingHide());
		})
		.catch( err => { 
			dispatch(catchError(err)); 
		});
	}
}

export function sendInvitesAfterLogin(sendToFriends, sendToRelatives) {
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
			
			dispatch(sendInvites(sendToFriends, sendToRelatives));
		})
		.then( () => {
			dispatch(loadingActions.loadingHide());	
		},(err) => {
			console.error(err);
			dispatch(loadingActions.loadingHide());
		});
	}
}


export function sendInvitesWithLogin(sendToFriends, sendToRelatives){
	return (dispatch, getState) => {
		//if not loged in
		if (getState().user.profile){
			dispatch(sendInvites(sendToFriends, sendToRelatives));
		}else{
			dispatch(sendInvitesAfterLogin(sendToFriends, sendToRelatives));
		}
	}
}
//wall

export function postToWall(){
	return (dispatch, getState) => {

		const state = getState();
		const { wishlist, user } = state;

		const formData = new URLSearchParams();

		const wishlistUrl = state.wishlist.map( item => item.id).join(',');
		const serviceUrl = 'http://localhost:9000';

		const text = 'Текст о том что создан список и <a href="' + serviceUrl + '?wishlist=' + wishlistUrl + '">ссылка</a>';
		
		formData.append('body', text);
		formData.append('file', 37017);

		dispatch(loadingActions.loadingShow());
		
		return API.postToWall(user.profile.id_str, formData)
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


export function postToWallAfterLogin(formData) {
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


export function postToWallWithLogin(){
	return (dispatch, getState) => {
		
		//if not loged in
		if (getState().user.profile){
			dispatch(postToWall());
		}else{
			dispatch(postToWallAfterLogin());
		}

	}
}


function getUserDataPromises() {	
	const p0 = API.getUser();
	const p1 = API.getUserFriends();
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
		});
	}
}

export function init() {
	return dispatch => {
		return dispatch(getInitialData());	
	}
}

