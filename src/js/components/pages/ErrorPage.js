import React from 'react';

import ErrorMessage from '../../components/error/ErrorMessage';

const ErrorPage = (props) => (
	<div className={( (props.mixClass ? props.mixClass : '') + ' class')} id="class">

		<ErrorMessage mix="" />

	</div>
);

ErrorPage.propTypes = {
	mixClass: React.PropTypes.string,
};

export default ErrorPage;
