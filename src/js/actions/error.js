export const ERROR_SET = 'ERROR_SET';

export function setError(errorId) {
	return {
		type: ERROR_SET,
		payload: errorId,
	}
}


