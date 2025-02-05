import { env } from '$env/dynamic/public';
import mockProducts from '$lib/mock/products';
import type { Category } from '$lib/models/category';
import type { CreateProduct, Product } from '$lib/models/product';
import ProductSchema from '$lib/models/product';
import { flatObjectForFormData, flatToFormData } from '$lib/utils/formData';
import type { MaybeAsync, PaginatedQuery } from './service';
interface IServiceProduct {
    getPaginated(
        paginatedQuery: PaginatedQuery,
        searchString?: string,
        category?: Category['id']
    ): MaybeAsync<{ currentPage: number; data: Product[]; numberOfPages: number }>;
    getOne(id: Product['id']): MaybeAsync<Product>;
    modifyOne(id: Product['id'], data: Partial<CreateProduct>): MaybeAsync<Product>;
    deleteOne(id: Product['id']): MaybeAsync<void>;
    getLatest(): MaybeAsync<{ data: [Product, Product, Product] }>;
    createOne(item: CreateProduct, token: string): MaybeAsync<Product>;
}
class MockServiceProduct implements IServiceProduct {
    getLatest(): MaybeAsync<{ data: [Product, Product, Product] }> {
        throw new Error('Method not implemented.');
    }
    getPaginated(paginatedQuery: PaginatedQuery) {
        return {
            currentPage: 1,
            data: mockProducts,
            numberOfPages: 1
        };
    }
    getOne(id: Product['id']) {
        return mockProducts.find((p) => p.id === id) || mockProducts[0];
    }
    modifyOne(id: Product['id'], item: Partial<CreateProduct>) {
        return { ...mockProducts[0] };
    }
    deleteOne(id: Product['id']) {
        return;
    }
    createOne(item: CreateProduct) {
        return mockProducts[0];
    }
    getPaginatedFilter(
        paginatedQuery: PaginatedQuery,
        categoryId: number | undefined = undefined,
        searchString: string = ''
    ) {
        let dataToReturn = [...mockProducts];
        if (categoryId !== undefined) {
            dataToReturn = dataToReturn.filter((p) =>
                p.categories.some((c) => c.id === categoryId)
            );
        }
        if (searchString !== '') {
            dataToReturn = dataToReturn.filter((p) => p.name.includes(searchString));
        }
        return {
            currentPage: 1,
            data: dataToReturn,
            numberOfPages: 1
        };
    }
}
class ServiceProduct implements IServiceProduct {
    async createOne(item: CreateProduct, token: string): Promise<Product> {
        const flat = flatObjectForFormData(item);
        const formData = flatToFormData(flat);
        const response = await fetch(`${env.PUBLIC_MS_PRODUCT}/products`, {
            method: 'POST',
            body: formData,
            headers: { authorization: `Bearer ${token}` }
        });
        const body = await response.json();
        return body;
    }
    async getPaginated(
        paginatedQuery: PaginatedQuery,
        searchString?: string,
        category?: Category['id']
    ): Promise<{ currentPage: number; data: Product[]; numberOfPages: number }> {
        const url = new URL(`${env.PUBLIC_MS_PRODUCT}/products`);
        url.searchParams.append('page', paginatedQuery.page.toString());
        url.searchParams.append('pageSize', paginatedQuery.pageSize.toString());
        if (searchString !== undefined) url.searchParams.append('name', searchString);
        if (category !== undefined) url.searchParams.append('categoryId', category.toString());
        const response = await fetch(url);
        const body = await response.json();
        const parsedBody = await ProductSchema.array().parseAsync(body.data);
        return {
            ...body,
            data: parsedBody
        };
    }
    async getOne(id: Product['id']): Promise<Product> {
        const response = await fetch(`${env.PUBLIC_MS_PRODUCT}/products/${id}`);
        const body = await response.json();
        const parsedBody = ProductSchema.parse(body);
        return parsedBody;
    }
    modifyOne(id: Product['id'], data: Partial<CreateProduct>): MaybeAsync<Product> {
        throw new Error('Method not implemented.');
    }
    deleteOne(id: Product['id']): MaybeAsync<void> {
        throw new Error('Method not implemented.');
    }
    getLatest(): MaybeAsync<{ data: [Product, Product, Product] }> {
        throw new Error('Method not implemented.');
    }
}
const productService = new ServiceProduct();
export default productService;
