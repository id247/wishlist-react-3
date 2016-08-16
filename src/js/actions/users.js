export const USERS_LIST_ADD = 'USERS_LIST_ADD';
export const USERS_LIST_DELETE = 'USERS_LIST_DELETE';
export const USERS_LIST_UPDATE = 'USERS_LIST_UPDATE';
export const USERS_LIST_RESET = 'USERS_LIST_RESET';

export function usersListAdd(user) {
	return {
		type: USERS_LIST_ADD,
		payload: user,
	}
};
export function usersListDelete(index) {
	return {
		type: USERS_LIST_DELETE,
		payload: index,
	}
};
export function usersListUpdate(index, user) {
	return {
		type: USERS_LIST_UPDATE,
		payload: {index, user},
	}
};
export function usersListReset() {
	return {
		type: USERS_LIST_RESET,
	}
};