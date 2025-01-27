import { z } from 'zod';
import SoldProductSchema from './sold-product';

export const deliveryStatusEnum = z.enum(['Payed', 'Confirmed', 'Shipped', 'Delivered']);

const OrderSchema = z.object({
	id: z.string().uuid(),
	id_user: z.string().uuid(),
	purchase_datetime: z.string().datetime(),
	address: z.string(),
	postal_code: z.string(),
	city: z.string(),
	delivery_status: deliveryStatusEnum,
	sold_products: z.array(SoldProductSchema)
});
export type Order = z.infer<typeof OrderSchema>;

export default OrderSchema;
