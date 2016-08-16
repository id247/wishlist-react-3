import React from 'react';
import { Provider, connect } from 'react-redux';

import Loading from '../components/loading/Loading';
import Router from '../components/Router';

class Root extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>
				<div className="app__content">
					<Router index="index" />
					<Loading 
						mixClass="app__loading"
						visibleClass="app__loading--visible"
					/>
				</div>
			</Provider>
		);
	}
}

export default Root;
