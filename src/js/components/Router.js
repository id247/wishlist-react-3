import React from 'react';
import { connect } from 'react-redux';

//import { history } from '../history';

import * as pageActions from '../actions/page';

import Index from '../components/pages/Index';
import Login from '../components/pages/Login';
import ErrorPage from '../components/pages/ErrorPage';
//import Preview from '../components/pages/Preview';
 
class Router extends React.Component {


	componentWillMount(){
		// const { props } = this;
		
		// history.replace({
		// 	state: { page: 'index' }
		// });
		
		// this.unlisten = history.listen(location => {
		//   	console.log(location);
		// 	if (location.action === 'POP'){
  //  				//return 'Are you sure you want to leave this page?'
		//   		if (location.state){
		//   			location.state.page && props.setPageWithoutHistory(location.state.page);
		//   		}
		// 	}
		// });

	}

	componentWillUnmount() {
		//this.unlisten();
	}

	router(){
		const { props } = this;
		const pageId = props.page ? props.page : props.index;
		let page;

		switch(pageId){
			case 'login':
				page = <Login mixClass="app__page" />;
				break;
			// case 'preview':
			// 	page = <Preview mixClass="app__page" />;
			// 	break;			
			case 'error':
				page = <ErrorPage mixClass="app__page" />;	
				break;	
			case 'index':
			default: 
				page = <Index mixClass="app__page" />;	
		}	

		return page;	
	}

	render() {	
		return this.router();
	}

};

Router.propTypes = {

};

const mapStateToProps = (state, ownProps) => ({
	page: state.page,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	setPageWithoutHistory: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
