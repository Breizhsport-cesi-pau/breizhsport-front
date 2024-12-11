import { z } from 'zod';

const Product = z.object({
	id: z.string().uuid(),
	name: z.string({ required_error: 'Ce champs est requis.' }),
	description: z.string({ required_error: 'Ce champs est requis.' })
});
export type Product = z.infer<typeof Product>;
export default Product;
