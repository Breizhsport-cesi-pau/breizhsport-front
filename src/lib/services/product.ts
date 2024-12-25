import type { Category } from '$lib/models/category';
import type { Product } from '$lib/models/product';
import type { Variant } from '$lib/models/variant';
import type { IService, PaginatedQuery } from './service';
type MainProduct = Product & {
	categories: Category[];
	price: number;
	pictures: string[];
	variants: Variant[];
};
const variants: Variant[] = [
	{
		id: '10a1dv45-dx19-2301-2471-223932594561',
		id_product: '00a1dv45-dx19-2301-2471-223932594567',
		color: 'Gris',
		name: 'Gris',
		price: 15.99,
		size: '42',
		stock: 10
	},
	{
		id: '20a1dv45-dx19-2301-2471-223932594561',
		id_product: '00a1dv45-dx19-2301-2471-223932594567',
		color: 'Gris',
		name: 'Gris',
		price: 14.99,
		size: '40',
		stock: 10
	},
	{
		id: '90a1dv45-dx19-2301-2471-223932594561',
		id_product: '00a1dv45-dx19-2301-2471-223932594567',
		color: 'Blanc',
		name: 'Blanc',
		price: 14.99,
		size: '40',
		stock: 10
	},
	{
		id: '30a1dv45-dx19-2301-2471-223932594561',
		id_product: '00a1dv45-dx19-2301-2471-223932594569',
		color: 'Blanc',
		name: 'Pour les petits',
		price: 49.99,
		size: 'Moins de 16 ans',
		stock: 10
	},
	{
		id: '40a1dv45-dx19-2301-2471-223932594561',
		id_product: '00a1dv45-dx19-2301-2471-223932594569',
		color: 'Blanc',
		name: 'Pour les grands',
		price: 59.99,
		size: 'Plus de 18 ans',
		stock: 10
	},
	{
		id: '50a1dv45-dx19-2301-2471-223932594561',
		id_product: '00a1dv45-dx19-2301-2471-223932594564',
		color: 'Blanc',
		name: 'Pour les minimalistes',
		price: 29.99,
		size: 'Normale',
		stock: 10
	},
	{
		id: '60a1dv45-dx19-2301-2471-223932594561',
		id_product: '00a1dv45-dx19-2301-2471-223932594564',
		color: 'Coupe du monde 2022',
		name: 'Pour les champions',
		price: 39.99,
		size: 'Normale',
		stock: 10
	}
];
const data: MainProduct[] = [
	{
		description: 'Pour dépasser mami',
		id: '00a1dv45-dx19-2301-2471-223932594567',
		name: 'Chaussure de ouf',
		categories: [
			{
				id: 0,
				name: 'Running'
			},
			{
				id: 1,
				name: 'Chaussure'
			}
		],
		price: variants
			.filter((v) => v.id_product === '00a1dv45-dx19-2301-2471-223932594567')
			.sort((a, b) => a.price - b.price)[0].price,
		pictures: [
			'https://blog.therunningcollective.fr/wp-content/uploads/2023/12/Peg-41-1024x586.jpeg'
		],
		variants: variants.filter((v) => v.id_product === '00a1dv45-dx19-2301-2471-223932594567')
	},
	{
		description: 'Pour remplacer Nadal',
		id: '00a1dv45-dx19-2301-2471-223932594569',
		name: 'Raquette de pro',
		categories: [
			{
				id: 2,
				name: 'Tennis'
			},
			{
				id: 3,
				name: 'Raquette'
			}
		],
		price: variants
			.filter((v) => v.id_product === '00a1dv45-dx19-2301-2471-223932594569')
			.sort((a, b) => a.price - b.price)[0].price,
		pictures: ['https://cdn.drouot.com/d/image/lot?size=phare&path=140/13558/139.jpg'],
		variants: variants.filter((v) => v.id_product === '00a1dv45-dx19-2301-2471-223932594569')
	},
	{
		description: 'Pour ne pas rater les pennos comme MBappé.',
		id: '00a1dv45-dx19-2301-2471-223932594564',
		name: 'Ballon haute voltige',
		categories: [
			{
				id: 4,
				name: 'Foot'
			},
			{
				id: 5,
				name: 'Ballon'
			}
		],
		price: variants
			.filter((v) => v.id_product === '00a1dv45-dx19-2301-2471-223932594564')
			.sort((a, b) => a.price - b.price)[0].price,
		pictures: [
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfvFtoucpGFanezM2l-1l7bX_US6J1Z84cZA&s'
		],
		variants: variants.filter((v) => v.id_product === '00a1dv45-dx19-2301-2471-223932594564')
	}
];
class MockServiceProduct implements IService<Product, Product> {
	getPaginated(paginatedQuery: PaginatedQuery) {
		return {
			currentPage: 1,
			data,
			numberOfPages: 1
		};
	}
	getOne(id: Product['id']) {
		return data.find((p) => p.id === id) || data[0];
	}
	modifyOne(id: Product['id'], item: Partial<Omit<Product, 'id'>>) {
		return { ...data[0] };
	}
	deleteOne(id: Product['id']) {
		return { ...data[0] };
	}
	createOne(item: Omit<Product, 'id'>) {
		return data[0];
	}
	getPaginatedFilter(
		paginatedQuery: PaginatedQuery,
		categoryId: number | undefined = undefined,
		searchString: string = ''
	) {
		let dataToReturn = [...data];
		if (categoryId !== undefined) {
			dataToReturn = dataToReturn.filter((p) => p.categories.some((c) => c.id === categoryId));
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

const productService = new MockServiceProduct();
export default productService;
