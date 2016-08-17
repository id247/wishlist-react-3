'use strict';

import 'whatwg-fetch';
import hello from '../../../node_modules/hellojs/dist/hello.js';

import { OAuthOptions, APIoptions } from 'appSettings';

hello.init({
	dnevnik: {
		name: 'Dnevnik',

		oauth: {
			version: 2,
			auth: OAuthOptions.authUrl,
			grant: OAuthOptions.grantUrl,
		},

		// Refresh the access_token once expired
		refresh: true,

		scope: {
			'basic': OAuthOptions.scope,
		},

		response_type: 'token',

		scope_delim: ' ',

		login: function(p) {
			p.options.popup.width = 710;
		},

		base: APIoptions.base,
	}
});

hello.init({
	dnevnik : OAuthOptions.clientId,
},{
	redirect_uri : OAuthOptions.modalRedirectUrl,
});

const dnevnik = hello('dnevnik');


//promisewrapper to use 'catch' errors in promise chain
function sendRequest_(options){
	return new Promise( (resolve, reject) => {
		if (options.data){
			options.headers = {
				//'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			};
		}

		dnevnik.api(options)
		.then(
			res => {
				//console.log(res);
				switch(res.type){
					case 'tokenRequired':
					case 'invalidToken':
						reject(requestError('Unauthorized', res.type + ': ' + res.description))
						break;
					case 'apiResourceUnavailable':
					case 'parameterInvalid':
					case 'invalidRequest':
						reject(requestError('ResourceUnavailable', res.type + ': ' + res.description))
						break;
					default:
						resolve(res);
				}
			},
			err => {
				//console.error(err);
				reject(new Error('Unknown Error'));
			}
		);
	});
} 

function sendRequest(options){
	
	if (!dnevnik || !dnevnik.getAuthResponse() || !dnevnik.getAuthResponse().access_token){
		const err = new Error();
		err.message = 'Unauthorized';
		err.description = 'no token';
		return Promise.reject(err);	
	}

	const accessToken = dnevnik.getAuthResponse().access_token;
	const join = options.path.indexOf('&') > -1 ? '&' : '?';
	const url = APIoptions.base + options.path + join + 'access_token=' + accessToken;
	
	options.method = options.method ? options.method : 'get';
	
	options.headers = {
		//'Accept': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
	};

	console.log(url, options);

	return fetch(url, options)
	.then( response => {
		console.log(response);
		switch(response.status){
			case 204: 
				return 'ok';
				break;
			case 200: 
			case 400: 
			case 401: 
				return response.json();
				break;
			default:
				throw new Error(response.status + ': ' + response.statusText);
		}
		
	})
	.then( res => {
		console.log(res);

		switch(res.type){
			case 'tokenRequired':
			case 'invalidToken':
				throw requestError('Unauthorized', res.type + ': ' + res.description);
				break;
			case 'apiResourceUnavailable':
			case 'parameterInvalid':
			case 'invalidRequest':
				throw requestError('ResourceUnavailable', res.type + ': ' + res.description);
				break;
			default:
				return res;
		}
		
	});
} 

function requestError(name, description){
	const err = new Error();
	err.message = name;
	err.description = description;
	return err;
}

function paramsError(description){
	const err = new Error();
	err.message = 'ResourceUnavailable';
	err.description = description;
	return Promise.reject(err);
}

export const OAuth = {
	login: () => {
		return dnevnik.login();
	},
	logout: () => {
		return dnevnik.logout();
	},
} 

export const API = {
	getUser: (userId = 'me') => {
		const options = {
			path: 'users/' + userId,
		};

		return sendRequest(options);
	},
	getUserFriends: (userId = 'me') => {
		const options = {
			path: 'users/' + userId + '/friends',
		};

		return sendRequest(options);
	},
	getUserRelatives: (userId = 'me') => {
		const options = {
			path: 'users/' + userId + '/relatives',
		};

		return sendRequest(options);
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

		return sendRequest(options);
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

		return sendRequest(options);
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

		return sendRequest(options);
	},
} 



