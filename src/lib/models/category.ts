import { z } from 'zod';

const CategorySchema = z.object({
	id: z.number(),
	name: z.string({ required_error: 'Ce champs est requis.' })
});

export type Category = z.infer<typeof CategorySchema>;
export default CategorySchema;
