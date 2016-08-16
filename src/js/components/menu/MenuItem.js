import React from 'react';

const MenuItem = (props) => (
	<li className={'menu__item ' + (props.activeCategory === props.category.id ? 'menu__item--active' : '')}>
		<a 	href={('#category-' + props.category.id)}
			className={('menu__href ' + (props.category.icon ? 'menu__href--' + props.category.icon + ' ' : '') + (props.activeCategory === props.category.id ? 'menu__href--active' : ''))}
			onClick={props.onClickHandler}
			>
			<span className="menu__text">
				{props.category.title}
			</span>
		</a>
	</li>
);

MenuItem.propTypes = {
	category: React.PropTypes.object.isRequired,
	activeCategory: React.PropTypes.number.isRequired,
	onClickHandler: React.PropTypes.func.isRequired,
}

export default MenuItem;
