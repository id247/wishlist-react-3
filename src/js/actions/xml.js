export const XML_PRODUCTS_ADD = 'XML_PRODUCTS_ADD';

export function xmlProductsAdd(products) {
	return {
		type: XML_PRODUCTS_ADD,
		payload: products,
		meta: {
			loading: false
		}
	}
}

export const XML_CATEGORIES_ADD = 'XML_CATEGORIES_ADD';

export function xmlCategoriesAdd(categories) {
	return {
		type: XML_CATEGORIES_ADD,
		payload: categories,
	}
}

export const XML_ACTIVE_CATEGORY_SET = 'XML_ACTIVE_CATEGORY_SET';

export function xmlActiveCategorySet(categoryId) {
	return {
		type: XML_ACTIVE_CATEGORY_SET,
		payload: categoryId,
	}
}



