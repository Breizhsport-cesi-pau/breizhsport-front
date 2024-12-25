import productService from '$lib/services/product';
import type { PageLoad } from './$types';

export const load = (async () => {
	const products = await productService.getPaginated({ page: 1, pageSize: 20 });
	return { products };
}) satisfies PageLoad;
