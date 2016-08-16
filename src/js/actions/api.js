import { OAuth, API } from '../api';

import * as initActions from '../actions/init';
import * as pageActions from '../actions/page';
import * as loadingActions from '../actions/loading';
import * as errorActions from '../actions/error';
import * as userActions from '../actions/user';
import * as schoolsActions from '../actions/schools';
import * as classesActions from '../actions/classes';
import * as usersActions from '../actions/users';


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

		if (!user.roles || user.roles.indexOf('EduStaff') === -1){
			throw new Error('teachers-only');
		}

		dispatch(userActions.userSet(user));	
	}
}


//users

export function usersGetUser(userId) {
	return dispatch => {	
		dispatch(loadingActions.loadingShow());
				
		return API.getUser(userId)
		.then( user => {
			dispatch(usersActions.usersListAdd(user));
			dispatch(loadingActions.loadingHide());
		})		
		.catch( err => {
			dispatch(catchError(err));
		});
	}
}

//schools

export function setSchools(schools){
	return dispatch => {	
		if (schools.length === 0){
			throw new Error('no-schools');
		}
		dispatch(schoolsActions.setList(schools));
	}
}

export function setSchoolsCurrent(schoolId){
	return dispatch => {	
		dispatch(schoolsActions.setCurrent(schoolId));
	}
}

//classes

export function getSchoolClasses(schoolId){
	return dispatch => {
		dispatch(loadingActions.loadingShow());	
		
		API.getSchoolClasses(schoolId)
		.then( classes => {
			dispatch(setSchoolClases(classes));
			dispatch(loadingActions.loadingHide());
		})
		.catch( err => {
			console.error(err);
			dispatch(setSchoolClases([]));
			dispatch(loadingActions.loadingHide());
		});
	}
}

export function setSchoolClases(classes){
	return dispatch => {	
		dispatch(classesActions.setList(classes));
	}
}

//init

export function init() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());	
		
		return API.getUser('me')
		.then( user => {
			dispatch(setUser(user));
			dispatch(initActions.apiInitialDataLoaded());
			dispatch(loadingActions.loadingHide());
		})
		.catch( err => {
			dispatch(catchError(err));
		});
	}
}

