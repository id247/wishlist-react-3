'use strict';

import hello from '../../../node_modules/hellojs/dist/hello.js';

import { OAuthOptions } from 'appSettings';

hello.init({

	dnevnik: {
		name: 'Dnevnik',

		oauth: {
			version: 2,
			auth: 'https://login.staging.dnevnik.ru/oauth2',
			grant: 'https://api.staging.dnevnik.ru/v1/authorizations'
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

		base: 'https://api.staging.dnevnik.ru/v1/',

		// There aren't many routes that map to the hello.api so I included me/bikes
		// ... because, bikes
		get: {
			//users: 'users/me'
		},
		wrap: {
			//me: function(o, headers) {}
		}
	}
});

hello.init({
	// Register app https://sellercentral.dnevnik.com/gp/homepage.html
	dnevnik : OAuthOptions.clientId,
},{
	redirect_uri : OAuthOptions.modalRedirectUrl,
});

const dnevnik = hello('dnevnik');


//promisewrapper to use 'catch' errors in promise chain
function sendRequest(options){
	return new Promise( (resolve, reject) => {
		dnevnik.api(options)
		.then(
			res => {
				console.log(res);
				switch(res.type){
					case 'tokenRequired':
					case 'invalidToken':
						reject(new Error('Unauthorized'));
						break;
					default:
						resolve(res);
				}
			},
			err => {
				console.error(err);
				reject(new Error('Unknown Error'));
			}
		);
	});
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
			path: 'users/' + userId
		};

		return sendRequest(options);
	},
} 



