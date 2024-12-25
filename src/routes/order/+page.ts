import orderService from '$lib/services/order';
import type { PageLoad } from './$types';
export const load = (async () => {
	const orders = await orderService.getPaginated({ page: 1, pageSize: 20 });
	return {
		orders
	};
}) satisfies PageLoad;
