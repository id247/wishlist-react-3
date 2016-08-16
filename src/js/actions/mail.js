import * as loadingActions from '../actions/loading';

export function sendList(data) {
	return dispatch => {	
		dispatch(loadingActions.loadingShow());
		let options =	{
			method: 'post',
			//dataType: 'json',
			mode: 'no-cors',
			body: data,
		};
		fetch('https://formspree.io/bazhenov@company.dnevnik.ru', options)
		.then( res => {
			console.log(res);
			dispatch(loadingActions.loadingHide());
		})
		.catch( err => {
			console.error(err);
			dispatch(loadingActions.loadingHide());
		})
	}
}
