import * as actions from '../actions/loading';

const loadingMiddleware = ({dispatch}) => {
	return next => action => {
		const {meta} = action
		if (!meta || !meta.hasOwnProperty('loading')) {
			return next(action)
		}

		if(meta.loading){
			dispatch({type: actions.LOADING_SHOW})
		}
		else{
			dispatch({type: actions.LOADING_HIDE})
		}

		return next(action)
	}
}

export default loadingMiddleware;
