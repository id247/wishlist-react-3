import React from 'react';

const Price = (props) => (
	<div className={( (props.mixClass ? props.mixClass : '') + ' catalog-price')}>
		<div className="catalog-price__content">
			<span className="catalog-price__price">
				{props.price} 
			</span>
			{' '}
			<span className="catalog-price__curency">
				{props.currency}
			</span>
		</div>
		<a 	href={props.shopUrl} 
			className={('catalog-price__shop ' + (props.shopId ? 'catalog-price__shop--' + props.shopId : '') )}
			target="_blank"
		>
			{props.shopName}
		</a>
	</div>
);


Price.propTypes = {
	mixClass: React.PropTypes.string,
	price: React.PropTypes.number.isRequired,
	currency: React.PropTypes.string.isRequired,
	shopName: React.PropTypes.string.isRequired,
	shopId: React.PropTypes.string.isRequired,
	shopUrl: React.PropTypes.string.isRequired,
};

export default Price;
