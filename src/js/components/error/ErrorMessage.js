import React from 'react';
import { connect } from 'react-redux';

import { errors } from '../../settings/settings';

const ErrorMessage = (props) => {
	
	const error = errors[props.errorId] ? errors[props.errorId] : errors['unknown'];

	return (
		<div className={( (props.mixClass ? props.mixClass : '') + ' error-message')}>

			<div className="error-message__title">
				{error.title}
			</div>

			<div className="error-message__text">
				{error.text}
			</div>

		</div>
	)
};

ErrorMessage.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	errorId: state.error,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
