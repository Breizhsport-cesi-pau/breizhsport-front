export type PaginatedResult<T> = {
	numberOfPages: number;
	previousUrl?: string;
	nextUrl?: string;
	data: T;
	currentPage: number;
};
export type PaginatedQuery = {
	page: number;
	pageSize: number;
};
export type MaybeAsync<T> = Promise<T> | T;
export interface IService<T extends { id: any }, P extends Partial<T>> {
	getPaginated(paginatedQuery: PaginatedQuery): MaybeAsync<PaginatedResult<P[]>>;
	getOne(id: T['id']): MaybeAsync<T>;
	modifyOne(id: T['id'], item: Partial<Omit<T, 'id'>>): MaybeAsync<T>;
	deleteOne(id: T['id']): MaybeAsync<T>;
	createOne(item: Omit<T, 'id'>): MaybeAsync<T>;
}
