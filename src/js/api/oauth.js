import OAuthProvider from './hello.js';

export default {
	login: () => {
		return OAuthProvider.login();
	},
	logout: () => {
		return OAuthProvider.logout();
	},
} 
