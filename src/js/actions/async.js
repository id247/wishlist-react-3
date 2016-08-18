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
				dispatch(logout());
				dispatch(pageActions.setPageWithoutHistory('login'));
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

export function getClassParents() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		let data = {};
		
		return API.getUserChildrenIds()
		.then( childrenIds => {
			console.log(childrenIds);
			data.childrenIds = childrenIds;

			const promises = [];

			childrenIds.map( id => {
				promises.push(API.getUser(id));
			});
			
			return Promise.all(promises);
		})
		.then( allChildrens => {
			console.log(allChildrens);

			const childrens = [].concat.apply([], allChildrens);
			const UniqChildrens = Array.from(new Set(childrens));

			data.UniqChildrens = UniqChildrens;
			data.ChildSchool = [];

			const promises = [];

			UniqChildrens.map( (children, i) => {
				data.ChildSchool.push(children.personId_str);
				promises.push(API.getUserSchools(children.id_str));
			});
			
			return Promise.all(promises);
		})
		.then( allSchools => {
			console.log('sdsdd');
			console.log(allSchools);
			console.log(data.ChildSchool);

			const childrenSchools = [];

			allSchools.map( (schools, i) => {
				schools.map( schoolId => {
					childrenSchools.push({childId: data.ChildSchool[i], schoolId: schoolId});
				})				
			});

			console.log(childrenSchools);

			const schools = [].concat.apply([], allSchools);

			const promises = [];

			console.log(data.UniqChildrens);

			childrenSchools.map( (childrenSchool, i) => {
				promises.push(API.getPersonEduGroupsBySchool(childrenSchool.childId, childrenSchool.schoolId));
			});
			
			return Promise.all(promises);
		})
		.then( AllEduGroups => {
			console.log(AllEduGroups);

			const eduGroups = [].concat.apply([], AllEduGroups);
			const UniqEduGroups = Array.from(new Set(eduGroups));



			const promises = [];

			UniqEduGroups.map( eguGroup => {
				promises.push(API.getEduGroupPersons(eguGroup.id_str));
			});
			
			return Promise.all(promises);

		})
		.then( allEguGroupsChildrens => {
			console.log(allEguGroupsChildrens);
			
			let allChildren = [];
			let allChildrenIds = [];
			let UniqAllChildrenIds = [];

			allEguGroupsChildrens.map( childrens => {
				allChildren = [...allChildren, ...childrens];
			});

			allChildren.map( children => {
				allChildrenIds.push(children.userId_str);
			}); 

			console.log('allChildrenIds', allChildrenIds);

			UniqAllChildrenIds = Array.from(new Set(allChildrenIds)).filter( childrenId => {
			 	return childrenId && data.childrenIds.indexOf(childrenId) === -1;
			});
			
			console.log('UniqAllChildrenIds', UniqAllChildrenIds);

			return UniqAllChildrenIds;
		})
		.then( UniqAllChildrenIds => {
			console.log(UniqAllChildrenIds);

			let promises = [];

			UniqAllChildrenIds.map( userId => {
				promises.push(API.getUserRelatives(userId));
			});
			
			return Promise.all(promises);
		})
		.then( allPersonsParents => {
			console.log(allPersonsParents);

			let allParents = [];
			let allParentsIds = [];
			let UniqAllParentsIds = [];

			allPersonsParents.map( parents => {
				allParents = [...allParents, ...parents];
			}); 

			console.log(allParents);

			allParents.map( parent => {
				allParentsIds.push(parent.person.userId_str);
			}); 

			console.log(allParentsIds);

			UniqAllParentsIds = Array.from(new Set(allParentsIds)).filter( parentId => {
			 	return parentId;
			});

			console.log(UniqAllParentsIds);

		})
		.then( () => {
			dispatch(loadingActions.loadingHide());
		})
		.catch( err => { 
			dispatch(catchError(err)); 
		});
	}
}




