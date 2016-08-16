import React from 'react';
import { connect } from 'react-redux';

const Loading = (props) => (
	<div 
		className={( 	(props.mixClass ? props.mixClass : '') 
						+ (props.loading && props.visibleClass ? ' ' + props.visibleClass : '') 
						+ ' app-loading')} 
	>
		<div className="app-loading__content">
			Загрузка...
		</div>
	</div>
);

const mapStateToProps = (state, ownProps) => ({	
	loading: state.loading,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

Loading.propTypes = {
	mixClass: React.PropTypes.string,
	visibleClass: React.PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
