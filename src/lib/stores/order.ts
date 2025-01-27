import { writable } from 'svelte/store';
import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import type { Order } from '$lib/models/order';
export const orderStore = persist(writable<Order[]>([]), createLocalStorage(), 'orders');
