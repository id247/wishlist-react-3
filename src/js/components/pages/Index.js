import React from 'react';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

import Header from '../../components/header/Header';
import Main from '../../components/main/Main';

class Index extends React.Component {

	componentWillMount(){
		const { props } = this;
		if (!props.isInitialDataLoaded){
			props.init();
		}
	}

	render(){
		const { props } = this;
		const content = props.isInitialDataLoaded
			? <Main mixClass="catalog-container__catalog"  />
			: null;
		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' catalog-container')}>
				
				<Header mixClass="catalog-container__header" />

				{content}
			</div>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
	isInitialDataLoaded: state.init.isInitialDataLoaded,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	init: () => dispatch(asyncActions.init()), 
	logout: () => dispatch(asyncActions.logout()), 
});

Index.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
