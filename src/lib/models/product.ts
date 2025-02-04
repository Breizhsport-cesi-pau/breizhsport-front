import { z } from 'zod';
import VariantSchema from './variant';
import CategorySchema from './category';

const ProductSchema = z.object({
    id: z.number(),
    name: z.string({ required_error: 'Ce champs est requis.' }),
    description: z.string({ required_error: 'Ce champs est requis.' }),
    variants: VariantSchema.array(),
    categories: CategorySchema.array()
});
export const CreateProductSchema = ProductSchema.extend({
    variants: VariantSchema.omit({ id: true, id_product: true })
        .extend({
            pictures: z
                .instanceof(File)
                .refine((f) => f.size < 100_000_000)
                .array()
        })
        .array(),
    categories: CategorySchema.omit({ name: true })
}).omit({ id: true });
export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export default ProductSchema;
