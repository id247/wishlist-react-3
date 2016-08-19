'use strict';

import Ajax from './ajax.js';

function paramsError(description){
	return Promise.reject(new Error(description));
}

export default {
	getUser: (userId = 'me') => {
		const options = {
			path: 'users/' + userId,
		};

		return Ajax(options);
	},
	getUsers: (userIds) => {
		if (!userIds){
			return paramsError('no userIds in API.getUsers');
		}
		
		const formData = new FormData();
		userIds.map( (userId, i) => {
			formData.append('users[' + i + ']', userId);
		});	

		const options = {
			path: 'users/many',
			method: 'post',
			body: formData,
		};

		return Ajax(options);
	},
	getUserFriendsIds: (userId = 'me') => {
		const options = {
			path: 'users/' + userId + '/friends',
		};

		return Ajax(options);
	},
	getUserRelatives: (userId = 'me') => {
		const options = {
			path: 'users/' + userId + '/relatives',
		};

		return Ajax(options);
	},
	sendMessage: (data) => {
		if (!data){
			return paramsError('no data in API.sendMessage');
		}
		const options = {
			path: 'messages',
			method: 'post',
			body: data,
		};

		return Ajax(options);
	},
	sendInvites: (data) => {
		if (!data){
			return paramsError('no data in API.sendInvites');
		}
		const options = {
			path: 'invites',
			method: 'post',
			body: data,
		};

		return Ajax(options);
	},
	postToWall: (userId, data) => {
		if (!userId){
			return paramsError('no userId in API.postToWall');
		}
		if (!data){
			return paramsError('no data in API.postToWall');
		}

		const options = {
			path: 'users/' + userId + '/wall-items',
			method: 'put',
			body: data,
		};

		return Ajax(options);
	},
} 



