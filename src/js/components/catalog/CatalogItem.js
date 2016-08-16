import React from 'react';

import CatalogPrice from '../../components/catalog/CatalogPrice';
import CatalogImage from '../../components/catalog/CatalogImage';

const CatalogItem = (props) => {

	const buttonText = props.isAddedToWishlist ? 'Добавлено' : 'Добавить в список желаний';
	
	return (
		<div className={( (props.mixClass ? props.mixClass : '') + ' catalog-item')}>

			<div className="catalog-item__image">

				<CatalogImage
					src={props.product.image} 
					alt={props.product.title}
				/>

			</div>

			<div className="catalog-item__content">

				<h3 className="catalog-item__title">
					{props.product.title}
				</h3>

				<div className="catalog-item__text" dangerouslySetInnerHTML={{__html: props.product.text}} />

				<CatalogPrice 
					mixClass="catalog-item__price"
					price={parseInt(props.product.price)} 
					currency={props.product.currency} 
					shopName={props.product.shopName} 
					shopId={props.product.shopId} 
					shopUrl={props.product.link} 
				/>

				<div className="catalog-item__button-placeholder">
					<button 
						className="catalog-item__button button button--block button--yellow button--m"
						onClick={props.addToWishlistHandler}
						disabled={(props.isAddedToWishlist)}
					>
						{buttonText}
					</button>
				</div>

			</div>

		</div>
	)
};

CatalogItem.propTypes = {
	mixClass: React.PropTypes.string,
	product: React.PropTypes.object.isRequired,
	isAddedToWishlist: React.PropTypes.bool.isRequired,
	addToWishlistHandler: React.PropTypes.func.isRequired,
};


export default CatalogItem;
