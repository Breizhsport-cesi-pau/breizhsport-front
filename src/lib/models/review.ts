import { z } from 'zod';
import Variant from './variant';
import User from './user';

const Review = z.object({
	id: z.string().uuid(),
	content: z.string(),
	id_variant: Variant.shape.id,
	id_user: User.shape.id,
	rating: z.number().min(0).max(5)
});

export type Review = z.infer<typeof Review>;

export default Review;
