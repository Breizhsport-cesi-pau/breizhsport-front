import { loginSchema } from '$lib/components/forms/login.js';
import type { PageLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageLoad = async () => {
    return {
        form: await superValidate(zod(loginSchema))
    };
};
