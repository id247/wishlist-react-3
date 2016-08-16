import React from 'react';
import { connect } from 'react-redux';

//import { history } from '../history';

import * as pageActions from '../actions/page';

import Index from '../components/pages/Index';
import Login from '../components/pages/Login';
import ErrorPage from '../components/pages/ErrorPage';
 
class Router extends React.Component {


	componentWillMount(){
	}

	componentWillUnmount() {
	}

	router(){
		const { props } = this;
		const pageId = props.page ? props.page : props.index;
		let page;

		switch(pageId){
			case 'login':
				page = <Login mixClass="page__login" />;
				break;
			case 'error':
				page = <ErrorPage mixClass="page__error" />;	
				break;	
			case 'index':
			default: 
				page = <Index mixClass="page__catalog-container" />;	
		}	

		return page;	
	}

	render() {	
		return this.router();
	}

};

Router.propTypes = {
	index: React.PropTypes.string, 
};

const mapStateToProps = (state, ownProps) => ({
	page: state.page,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	setPageWithoutHistory: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
