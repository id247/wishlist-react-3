import React from 'react';
import { Provider, connect } from 'react-redux';

import Loading from '../components/loading/Loading';
import Index from '../components/pages/Index';

class Root extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>
				<div className="page">
					<Index mixClass="page__catalog-container" />
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
