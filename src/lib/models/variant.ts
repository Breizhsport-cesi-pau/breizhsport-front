import { z } from 'zod';
import Product from './product';

const VariantSchema = z.object({
	id: z.string().uuid(),
	id_product: Product.shape.id,
	size: z.string({ required_error: 'Ce champs est requis.' }),
	color: z.string({ required_error: 'Ce champs est requis.' }),
	price: z.number({ required_error: 'Ce champs est requis.' }),
	stock: z.number({ required_error: 'Ce champs est requis.' }),
	name: z.string({ required_error: 'Ce champs est requis.' })
});

export type Variant = z.infer<typeof VariantSchema>;
export default VariantSchema;
