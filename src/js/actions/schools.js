export const SCHOOLS_SET_LIST = 'SCHOOLS_SET_LIST';

export function setList(schools) {
	return {
		type: SCHOOLS_SET_LIST,
		payload: schools
	}
}

export const SCHOOLS_SET_CURRENT = 'SCHOOLS_SET_CURRENT';

export function setCurrent(id) {
	return {
		type: SCHOOLS_SET_CURRENT,
		payload: id
	}
}


