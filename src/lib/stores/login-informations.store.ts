import { writable } from 'svelte/store';
import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
export enum UserRole {
	Customer = 'Customer',
	Admin = 'Admin'
}
export type LoginInformation =
	| {
			isLogged: false;
	  }
	| {
			isLogged: true;
			data: {
				firstname: string;
				lastname: string;
				role: UserRole;
			};
	  };
export const loginInformationStore = persist(
	writable<LoginInformation>({ isLogged: false }),
	createLocalStorage(),
	'loginInformationStore'
);
