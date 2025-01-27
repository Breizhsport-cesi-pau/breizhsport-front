import { loginInformationStore, UserRole } from '$lib/stores/login-informations.store';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';
export const ssr = false;
export const load = (async () => {
	const loginInfomration = get(loginInformationStore);
	if (!loginInfomration.isLogged || loginInfomration.data.role !== UserRole.Admin)
		return error(401, { message: 'Quelque chose me dit que vous vous êtes trompé de page...' });
}) satisfies LayoutLoad;
