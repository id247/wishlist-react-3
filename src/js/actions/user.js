
export const USER_SET = 'USER_SET';
export const USER_UNSET = 'USER_UNSET';

export function userSet(payload) {
	return {
		type: USER_SET,
		payload: payload
	}
};
export function userUnset() {
	return {
		type: USER_UNSET
	}
};

