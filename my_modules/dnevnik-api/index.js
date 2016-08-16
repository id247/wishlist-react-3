'use strict'

import 'whatwg-fetch';

export default (function DnevnikAPI(){
	
	let APIOptions = {
		server: '',
		token: false,
	}	

	function init(opts){
		Object.assign(APIOptions, opts);
	}

	function setToken(token){
		APIOptions.token = token;
	}

	function deleteToken(){
		APIOptions.token = false;
	}

	function ajaxSend(opts){

		function joinParam(url){
			return url.indexOf('?') > -1 ? '&' : '?';
		}

		function apiUrl(url){
			url = 'https://api.' + APIOptions.server + '/v1' + 
					url + 
					joinParam(url) + 
					'access_token=' + APIOptions.token;
			console.log(url);
			return url;
		}

		return new Promise( (resolve, reject) => {
			
			if (!APIOptions.token) { 
				reject('no token'); 
				return;
			}

			let options =	{
				url: '',
				method: 'get',
				dataType: 'json',
				mode: 'cors',
				//body: []
			};
			Object.assign(options, opts);

			function getResponse(response){
				switch (response.status){
					case 200: 
						resolve(response.json());
						break;
						default: reject(response.statusText);
				}
			}

			fetch(apiUrl(options.url), options)
			.then(getResponse)
			.catch(reject);
			
		});	

	}

	function getUserAjax(id = 'me') {

		let url = '/users/' + id;
			
		const options = {
			url: url
		};

		return ajaxSend(options);
	};

	return{
		init: init,
		setToken: setToken,
		deleteToken: deleteToken,
		ajaxSend: ajaxSend,
		getUserAjax: getUserAjax,
	}
	
})();
