import { writable } from 'svelte/store';
export type LoginInformation =
	| {
			isLogged: false;
	  }
	| {
			isLogged: true;
			data: {
				firstname: string;
				lastname: string;
			};
	  };
export const loginInformationStore = writable<LoginInformation>({ isLogged: false });
