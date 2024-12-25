import productService from '$lib/services/product';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const product = await productService.getOne(params.id);
	return {
		product
	};
}) satisfies PageLoad;