import type { Variant } from '$lib/models/variant';
import mockPictures from './pictures';

const mockVariants: Variant[] = [
    {
        id: '10a1dv45-dx19-2301-2471-223932594561',
        id_product: 1,
        color: 'Gris',
        name: 'Gris',
        price: 15.99,
        size: '42',
        stock: 10,
        pictures: mockPictures.filter(
            (p) => p.id_variant === '10a1dv45-dx19-2301-2471-223932594561'
        )
    },
    {
        id: '20a1dv45-dx19-2301-2471-223932594561',
        id_product: 1,
        color: 'Gris',
        name: 'Gris',
        price: 14.99,
        size: '40',
        stock: 10,
        pictures: mockPictures.filter(
            (p) => p.id_variant === '20a1dv45-dx19-2301-2471-223932594561'
        )
    },
    {
        id: '90a1dv45-dx19-2301-2471-223932594561',
        id_product: 1,
        color: 'Blanc',
        name: 'Blanc',
        price: 14.99,
        size: '40',
        stock: 10,
        pictures: mockPictures.filter(
            (p) => p.id_variant === '90a1dv45-dx19-2301-2471-223932594561'
        )
    },
    {
        id: '30a1dv45-dx19-2301-2471-223932594561',
        id_product: 2,
        color: 'Blanc',
        name: 'Pour les petits',
        price: 49.99,
        size: 'Moins de 16 ans',
        stock: 10,
        pictures: mockPictures.filter(
            (p) => p.id_variant === '30a1dv45-dx19-2301-2471-223932594561'
        )
    },
    {
        id: '40a1dv45-dx19-2301-2471-223932594561',
        id_product: 2,
        color: 'Blanc',
        name: 'Pour les grands',
        price: 59.99,
        size: 'Plus de 18 ans',
        stock: 10,
        pictures: mockPictures.filter(
            (p) => p.id_variant === '40a1dv45-dx19-2301-2471-223932594561'
        )
    },
    {
        id: '50a1dv45-dx19-2301-2471-223932594561',
        id_product: 3,
        color: 'Blanc',
        name: 'Pour les minimalistes',
        price: 29.99,
        size: 'Normale',
        stock: 10,
        pictures: mockPictures.filter(
            (p) => p.id_variant === '50a1dv45-dx19-2301-2471-223932594561'
        )
    },
    {
        id: '60a1dv45-dx19-2301-2471-223932594561',
        id_product: 3,
        color: 'Coupe du monde 2022',
        name: 'Pour les champions',
        price: 39.99,
        size: 'Normale',
        stock: 10,
        pictures: mockPictures.filter(
            (p) => p.id_variant === '60a1dv45-dx19-2301-2471-223932594561'
        )
    }
];
export default mockVariants;
