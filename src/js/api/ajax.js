//because hello.api() is piease of shit
import 'whatwg-fetch';

import OAuthProvider from '../api/hello.js';

import { APIoptions } from 'appSettings';

function sendRequest(options){

	console.log(OAuthProvider.getAuthResponse());
	
	if (!OAuthProvider || !OAuthProvider.getAuthResponse() || !OAuthProvider.getAuthResponse().access_token){
		const err = new Error();
		err.message = 'Unauthorized';
		err.description = 'no token';
		return Promise.reject(err);	
	}

	const accessToken = OAuthProvider.getAuthResponse().access_token;
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

export default sendRequest;
