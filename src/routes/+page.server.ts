import productService from '$lib/services/product';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const tennisProduct = await productService.getPaginated({ page: 1, pageSize: 1 }, '', 1);
    const footProduct = await productService.getPaginated({ page: 1, pageSize: 1 }, '', 1);
    const runningProduct = await productService.getPaginated({ page: 1, pageSize: 1 }, '', 1);
    const newComers = [
        {
            url: 'https://www.radiofrance.fr/s3/cruiser-production/2023/10/d6dbb5d9-ea1e-4516-b903-ab7b7994334b/1200x680_sc_2000x2667-image-1996-collection-2-3a59b173-13c5-4fca-a2f3-479f3393d078-720.jpg',
            name: 'Test 1'
        },
        {
            url: 'https://media.cdnws.com/_i/7819/12223/2175/25/batte-de-baseball-70-5cm-aluminium-rouge-resistant.jpeg',
            name: 'Test 2'
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-u9zOWYcGrEK3j9SNy6kTEwtzG21JlizjA&s',
            name: 'Test 3'
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn3Y0jGtujwwDK8BDauKuv41goFIWyNfbiJA&s',
            name: 'Test 4'
        },
        {
            url: 'https://www.radiofrance.fr/s3/cruiser-production/2023/10/d6dbb5d9-ea1e-4516-b903-ab7b7994334b/1200x680_sc_2000x2667-image-1996-collection-2-3a59b173-13c5-4fca-a2f3-479f3393d078-720.jpg',
            name: 'Test 1'
        },
        {
            url: 'https://media.cdnws.com/_i/7819/12223/2175/25/batte-de-baseball-70-5cm-aluminium-rouge-resistant.jpeg',
            name: 'Test 2'
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-u9zOWYcGrEK3j9SNy6kTEwtzG21JlizjA&s',
            name: 'Test 3'
        }
    ];
    return {
        tennisProduct: tennisProduct.data[0],
        footProduct: footProduct.data[0],
        runningProduct: runningProduct.data[0],
        newComers
    };
}) satisfies PageServerLoad;
