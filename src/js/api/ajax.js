//because hello.api() is piease of shit

import OAuthProvider from './hello.js';

import { APIoptions } from 'appSettings';

function sendRequest(options){

	const OAuthProviderResonse = OAuthProvider && OAuthProvider.getAuthResponse();
	const accessToken = OAuthProviderResonse && OAuthProviderResonse.access_token;

	if (!OAuthProviderResonse || !accessToken){
		return Promise.reject(requestError('Unauthorized', 'no token'));	
	}

	const url = generateUrl(APIoptions.base, options.path, accessToken);
		
	options.headers = {
		'Accept': '*/*',
		'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
	};

	return fetch(url, options)
	.then( selectResponse );
} 

function generateUrl(base, path, token){
	const accessToken = OAuthProvider.getAuthResponse().access_token;
	const join = path.indexOf('?') > -1 ? '&' : '?';
	const url = base + path + join + 'access_token=' + accessToken;
	return url;
}

function selectResponse(response){
	switch(response.status){
		case 204: 
			return 'ok';
			break;
		case 200: 
			return response.json();
		case 400: 
		case 401: 
			throw selectRequestError(response.json());
			break;
		default:
			throw requestError(response.status, response.statusText);
	}	
}

function selectRequestError(res){

	switch(res.type){
		case 'tokenRequired':
		case 'invalidToken':
			return requestError('Unauthorized', res.type + ': ' + res.description);
			break;
		case 'apiResourceUnavailable':
		case 'parameterInvalid':
		case 'invalidRequest':
			return requestError('ResourceUnavailable', res.type + ': ' + res.description);
			break;
		default:
			return requestError('Unknown', res.type + ': ' + res.description);
	}

}

function requestError(name, description){
	const err = new Error();
	err.message = name;
	err.description = description;
	return err;
}

export default sendRequest;
