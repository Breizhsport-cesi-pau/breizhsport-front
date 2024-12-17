import { writable } from 'svelte/store';
import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
export type Cart = {
	idProduct: string;
	idVariant: string;
	quantity: number;
};
const createCartStore = () => {
	const { subscribe, set, update } = writable<Cart[]>([]);

	return {
		subscribe,
		addProduct: (idProduct: string, idVariant: string, quantity: number) =>
			update((val) => {
				const isProductExist = val.findIndex(
					(p) => p.idProduct === idProduct && p.idVariant === idVariant
				);
				if (isProductExist !== -1) {
					val[isProductExist].quantity += quantity;
					return val;
				} else {
					val.push({ idProduct, idVariant, quantity });
					return val;
				}
			}),
		removeProduct: (idProduct: string, idVariant: string) =>
			update((val) => {
				const isProductExist = val.findIndex(
					(p) => p.idProduct === idProduct && p.idVariant === idVariant
				);
				if (isProductExist !== -1) {
					val.splice(isProductExist, 1);
					return val;
				} else {
					return val;
				}
			}),
		reset: () => set([]),
		set,
		update
	};
};
const internalCartStore = { ...persist(createCartStore(), createLocalStorage(), 'cart') };

export const cartStore = {
	...internalCartStore,
	addProduct: (idProduct: string, idVariant: string, quantity: number) =>
		internalCartStore.update((val) => {
			const isProductExist = val.findIndex(
				(p) => p.idProduct === idProduct && p.idVariant === idVariant
			);
			if (isProductExist !== -1) {
				val[isProductExist].quantity += quantity;
				return val;
			} else {
				val.push({ idProduct, idVariant, quantity });
				return val;
			}
		}),
	removeProduct: (idProduct: string, idVariant: string) =>
		internalCartStore.update((val) => {
			const isProductExist = val.findIndex(
				(p) => p.idProduct === idProduct && p.idVariant === idVariant
			);
			if (isProductExist !== -1) {
				val.splice(isProductExist, 1);
				return val;
			} else {
				return val;
			}
		})
};
