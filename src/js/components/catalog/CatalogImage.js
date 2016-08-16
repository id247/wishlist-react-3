import React from 'react';

const CatalogImage = (props) => (
	<div className="catalog-image">
		<div className="catalog-image__inner">
			<img className="catalog-image__image" src={props.src} alt={props.alt} />
		</div>
	</div>
);

CatalogImage.propTypes = {
	src: React.PropTypes.string.isRequired,
	alt: React.PropTypes.string.isRequired,
};

export default CatalogImage;
