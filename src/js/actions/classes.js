export const CLASSES_SET_LIST = 'CLASSES_SET_LIST';

export function setList(classes) {
	return {
		type: CLASSES_SET_LIST,
		payload: classes
	}
}
