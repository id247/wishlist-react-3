import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';

const Login = (props) => (
	<div className={( (props.mixClass ? props.mixClass : '') + ' app-page app-login')}>

		<div className="app-login__button-placeholder">
		
			<Button 
				size="m"
				color="white"
				type="button"
				onClickHandler={props.login}
			>
				Войти через Дневник.ру
			</Button>
		
		</div>

	</div>
);

Login.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	login: () => dispatch(asyncActions.login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
