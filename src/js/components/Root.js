import React from 'react';
import { Provider, connect } from 'react-redux';

import Loading from '../components/loading/Loading';
import Router from '../components/Router';

class Root extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>
				<div className="page">
					<Router index="index" />
					<Loading 
						mixClass="page__loader"
						visibleClass="loader--visible"
					/>
				</div>
			</Provider>
		);
	}
}

export default Root;
