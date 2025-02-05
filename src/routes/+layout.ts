import CategoryService from '$lib/services/category';
import type { LayoutLoad } from './$types';

export const load = (async () => {
    const categories = await CategoryService.getAll();
    return { categories };
}) satisfies LayoutLoad;
