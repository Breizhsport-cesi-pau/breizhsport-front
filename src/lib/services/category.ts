import { env } from '$env/dynamic/public';
import type { Category } from '$lib/models/category';
import type { IService, MaybeAsync, PaginatedQuery, PaginatedResult } from './service';
const data: Category[] = [
    {
        id: 0,
        name: 'Running'
    },
    {
        id: 1,
        name: 'Chaussure'
    },
    {
        id: 2,
        name: 'Tennis'
    },
    {
        id: 3,
        name: 'Raquette'
    },
    {
        id: 4,
        name: 'Foot'
    },
    {
        id: 5,
        name: 'Ballon'
    }
];
interface IServiceCategory {
    getAll(): MaybeAsync<Category[]>;
}
class MockServiceCategory implements IServiceCategory {
    getAll(): MaybeAsync<Category[]> {
        return data;
    }
}
class ServiceCategory implements IServiceCategory {
    async getAll(): Promise<Category[]> {
        const response = await fetch(`${env.PUBLIC_MS_PRODUCT}/categories`);
        const body = await response.json();
        return body;
    }
}
const CategoryService = new ServiceCategory();
export default CategoryService;
