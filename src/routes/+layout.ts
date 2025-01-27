import CategoryService from '$lib/services/category';
import type { LayoutLoad } from './$types';

export const load = (async () => {
	const categories = await CategoryService.getPaginated({ page: 1, pageSize: 20 });
	return { categories };
}) satisfies LayoutLoad;
