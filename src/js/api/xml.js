

//pseudo promise =) for future imlementation real fetch
function getFalseXML(){
	
	return new Promise( (resolve, reject) => {
		
		let products = [];
		let categories = [];

		[...document.querySelectorAll('.falsexml__item')].map( (item) => {	

			const tables = item.querySelectorAll('.OzonRev_tbMax');
			
			const categoryId = parseInt(item.getAttribute('data-category-id'));
			const categoryTitle = item.getAttribute('data-category-title');
			const categoryIcon = item.getAttribute('data-category-icon');

			categories.push({id: categoryId, title: categoryTitle, icon: categoryIcon});

			[...tables].forEach( table => {
				let href = table.querySelector('.OzonRev_detailName');

				if (!href) {
					return;
				}
				//update if item alredy exists
				const id = parseInt(href.href.match(/id\/(\d+)\//)[1]);
				const existingProduct = products.filter( product => (product.id == id) );
				
				if (existingProduct.length > 0){
					existingProduct[0].categories.push(categoryId);
					return;
				}

				const product = {
					id: id,
					categories: [categoryId],
					title: href.text,
					link: href.getAttribute('href'),
					image: table.querySelector('.OzonRev_tdPic img').getAttribute('data-src'),
					text: table.querySelector('.OzonRev_detailAnnot').innerHTML,
					price: table.querySelector('.OzonRev_priceValue > b').innerHTML,
					currency: table.querySelector('.OzonRev_priceCurrency').innerHTML,
					shopName: 'OZON.RU',
					shopId: 'ozon',

				}
				products.push(product);				
			});

		});

		if (products.length === 0){
			reject('No products');
		}

		resolve({
			products,
			categories
		});

	});
};

function getXML(){
	return getFalseXML();
}

export default {
	getXML,
}
