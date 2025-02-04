import { z } from 'zod';

const PictureSchema = z.object({
    id: z.number(),
    id_variant: z.string().uuid(),
    url: z.string()
});

export type Picture = z.infer<typeof PictureSchema>;
export default PictureSchema;
