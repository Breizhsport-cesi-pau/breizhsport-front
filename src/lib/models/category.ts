import { z } from 'zod';

const Category = z.object({
	id: z.number(),
	name: z.string({ required_error: 'Ce champs est requis.' })
});

export type Category = z.infer<typeof Category>;
export default Category;
