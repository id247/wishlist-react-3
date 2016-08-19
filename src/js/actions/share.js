export const SHARE_LOADING_SHOW = 'SHARE_LOADING_SHOW';
export const SHARE_LOADING_HIDE = 'SHARE_LOADING_HIDE';

export function shareLoadingShow(shareId) {
	return {
		type: SHARE_LOADING_SHOW,
		payload: shareId,
	}
}
export function shareLoadingHide(shareId) {
	return {
		type: SHARE_LOADING_HIDE,
		payload: shareId,
	}
}

export const SHARE_MESSAGE_ADD = 'SHARE_MESSAGE_ADD';

export function shareMessageAdd(shareId, message) {
	return {
		type: SHARE_MESSAGE_ADD,
		payload: {shareId, message},
	}
}


