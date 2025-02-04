import type { Product } from '$lib/models/product';
import mockCategories from './categories';
import mockVariants from './variants';

const mockProducts: Product[] = [
    {
        description: 'Pour dépasser mami',
        id: 1,
        name: 'Chaussure de ouf',
        categories: [mockCategories[0], mockCategories[1]],
        variants: mockVariants.filter((v) => v.id_product === 1)
    },
    {
        description: 'Pour remplacer Nadal',
        id: 2,
        name: 'Raquette de pro',
        categories: [mockCategories[2], mockCategories[3]],
        variants: mockVariants.filter((v) => v.id_product === 2)
    },
    {
        description: 'Pour ne pas rater les pennos comme MBappé.',
        id: 3,
        name: 'Ballon haute voltige',
        categories: [mockCategories[4], mockCategories[5]],
        variants: mockVariants.filter((v) => v.id_product === 3)
    }
];
export default mockProducts;
