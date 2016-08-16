import React from 'react';

import Menu from '../../components/menu/Menu';

const Header = (props) => (
	<header className={( (props.mixClass ? props.mixClass : '') + ' header')} id="header">

		<div className="header__wrap wrap">

			<Menu mixClass="header__menu" />

		</div>

	</header>
);

Header.propTypes = {
	mixClass: React.PropTypes.string,
};

export default Header;

