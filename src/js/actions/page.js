// import { history } from '../history';

export const PAGE_SET = 'PAGE_SET';
export const PAGE_SET_HISTORY = 'PAGE_SET_HISTORY';

export function setPage(page) {

	// history.push({
	//    state: { page: page }
	// });

	return {
		type: PAGE_SET,
		payload: page,
	}
}

export function setPageWithoutHistory(page) {

	return {
		type: PAGE_SET,
		payload: page,
	}
}


