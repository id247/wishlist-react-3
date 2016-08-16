import React from 'react';
import { connect } from 'react-redux';

import * as apiActions from '../../actions/api';

import Users from '../../components/users/Users';

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
			? <Users />
			: null;
		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' app-page')}>
				{content}
				<div style={{float: 'right'}}>
					<button onClick={props.logout}>logout</button>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
	isInitialDataLoaded: state.init.isInitialDataLoaded,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	init: () => dispatch(apiActions.init()), 
	logout: () => dispatch(apiActions.logout()), 
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
