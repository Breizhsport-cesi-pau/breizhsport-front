import { browser } from '$app/environment';
import type { Variant } from '$lib/models/variant';
import orderService from '$lib/services/order';
import productService from '$lib/services/product';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const order = await orderService.getOne(params.id);
	const soldProducts = await Promise.all(
		order.sold_products.map(async (p) => {
			const product = await productService.getOne(p.id);
			const variant = product.variants.find((v) => v.id === p.id_variant) as Variant;
			return { ...variant, productName: product.name };
		})
	);
	return {
		order,
		soldProducts
	};
}) satisfies PageLoad;
