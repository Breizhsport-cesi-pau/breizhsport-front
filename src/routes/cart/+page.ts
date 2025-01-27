import { cartStore } from '$lib/stores/cart';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import productService from '$lib/services/product';

export const load = (async () => {
	const cart = get(cartStore);
	const allCartProducts = await Promise.all(
		cart.map(async (c) => {
			const product = await productService.getOne(c.idProduct);
			let variant = product.variants.find((v) => v.id === c.idVariant);
			if (variant === undefined) variant = product.variants[0];
			return {
				product,
				variant,
				quantity: c.quantity
			};
		})
	);
	return {
		cart,
		allCartProducts
	};
}) satisfies PageLoad;
