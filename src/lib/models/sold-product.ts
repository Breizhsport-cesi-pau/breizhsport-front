import { z } from 'zod';
import OrderSchema from './order';
import VariantSchema from './variant';

const SoldProductSchema = z.object({
	id: z.string().uuid(),
	id_order: z.string().uuid(),
	price: VariantSchema.shape.price,
	quantity: z.number().min(1),
	id_variant: VariantSchema.shape.id
});

export type SoldProduct = z.infer<typeof SoldProductSchema>;

export default SoldProductSchema;
