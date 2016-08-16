'use strict'

import cookies from 'js-cookie';
import hello from 'hellojs';

export default (function DnevnikOAuth(){

	let OAuthOptions = {
		server: '',
		cookieName: '',
		scope: '',	
		clientId: '',
		//clienSecret: '',
		modalRedirectUrl: '',
		redirectUrl: ''
	}

	//check url and parse OAuthOptions.token from it
	function _getParameterByName(winObj, name) {
		const url = winObj.location.href;
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[#&]' + name + '(=([^&#]*)|&|#|$)'),
				results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
	function _getTokenFromUrl( winObj ){
		var token = _getParameterByName(winObj, 'access_token');
		if (!token) {
			return false;
		}
		cookies.set(OAuthOptions.cookieName, token, { expires: 7, path: ''});
		winObj.location.hash = '';
		return token;		
	}
	function _getTokenFromCookes(){
		return cookies.get(OAuthOptions.cookieName);
	}
	function _getAuthUrl(isModal = true){
		const protocol = window.location.href.indexOf('https:') === 0 ? 'https:' : 'http:';
		const redirectUrl = isModal ? OAuthOptions.modalRedirectUrl : OAuthOptions.redirectUrl;
		let url = 'https://login.' 		+ OAuthOptions.server + '/oauth2';
			url += '?response_type=' 	+ 'token';
			url += '&client_id=' 		+ OAuthOptions.clientId;
			//url += '&client_secret=' 	+ OAuthOptions.clienSecret;
			url += '&scope=' 			+ OAuthOptions.scope;
			url += '&redirect_uri=' 	+ protocol + redirectUrl;
		console.log(url);
		return url;
	}
	//auth with external page
	function _authExternal() {
		const isModal = false;
		const url = _getAuthUrl(isModal);
		window.location.replace(url);
	}
	//auth with modal popup
	function _authModal() {
		//check if we can get data from modal, it has to have the same domain
		function canAccessPopup(winObj) {
			let html = null;
			try { //try reading document
				html = winObj.document.body.innerHTML;
			} catch(err){
			// do nothing
			}
			return(html !== null);
		}

		return new Promise( (resolve, reject) => {		

			//recursive function
			function getToken(winObj){
				if (winObj && canAccessPopup(winObj)){
						
					const token = _getTokenFromUrl(winObj);
					const error = _getParameterByName(winObj, 'error');
					if (token) {	    				
						resolve();
						winObj.close();
					}else if (error){
						reject(winObj.location.href);
						winObj.close();
					}
				}

				if (winObj.closed){
					reject('modal closed');
				}else{
					setTimeout( () => {
						getToken(winObj);
					}, 30);
				}		
			}
			
			const isModal = true;
			const winObj = window.open(
				_getAuthUrl(isModal), 
				'_blank', 
				'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0'
			);

			getToken(winObj);

		});
	}

	//public methods
	function init(opts){
		Object.assign(OAuthOptions, opts);
	}
	function auth(){
		if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
			|| ( navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i) )
		){
			_authExternal();
		}else{
			return _authModal();
		}
	}
	function getToken(){
		return _getTokenFromUrl(window) || _getTokenFromCookes();
	}
	function deleteToken(){
		cookies.remove(OAuthOptions.cookieName);
	}

	return {
		init: init,
		auth: auth,
		auth2: _authExternal,
		getToken: getToken,
		deleteToken: deleteToken,
	}

})();

