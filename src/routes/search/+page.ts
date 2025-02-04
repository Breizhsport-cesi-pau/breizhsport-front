import productService from '$lib/services/product';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
    const keyword = url.searchParams.get('keyword') ?? '';
    const category = Number.isNaN(Number(url.searchParams.get('category') ?? undefined))
        ? undefined
        : Number(url.searchParams.get('category') ?? undefined);
    const page = Number(url.searchParams.get('page') ?? 1);
    const pageSize = Number(url.searchParams.get('pageSize') ?? 25);
    const paginatedResult = await productService.getPaginated(
        { page, pageSize },
        keyword,
        category
    );
    return {
        result: paginatedResult,
        keyword,
        category
    };
}) satisfies PageLoad;
