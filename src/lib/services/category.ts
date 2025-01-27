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
class MockServiceCategory implements IService<Category, Category> {
	getPaginated(paginatedQuery: PaginatedQuery) {
		return {
			currentPage: 1,
			data,
			numberOfPages: 1
		};
	}
	getOne(id: Category['id']) {
		return data.find((p) => p.id === id) || data[0];
	}
	modifyOne(id: Category['id'], item: Partial<Omit<Category, 'id'>>) {
		return { ...data[0] };
	}
	deleteOne(id: Category['id']) {
		return { ...data[0] };
	}
	createOne(item: Omit<Category, 'id'>) {
		return data[0];
	}
}

const CategoryService = new MockServiceCategory();
export default CategoryService;
