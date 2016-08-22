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

export function getToken(){
	const response = dnevnik && dnevnik.getAuthResponse();
	return response ? response.access_token : false;
}

export const OAuth = {
	login: () => {
		return dnevnik.login();
	},
	logout: () => {
		return dnevnik.logout();
	},
} 

export default dnevnik;
