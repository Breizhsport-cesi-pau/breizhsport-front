import type { CreateOrder, Order } from '$lib/models/order';
import { get } from 'svelte/store';
import type {
    IService,
    MaybeAsync as MaybePromise,
    PaginatedQuery,
    PaginatedResult
} from './service';
import { orderStore } from '$lib/stores/order';

class MockOrderService implements IService<Order, Omit<Order, 'sold_products'>> {
    getPaginated(
        paginatedQuery: PaginatedQuery
    ): MaybePromise<PaginatedResult<Omit<Order, 'sold_products'>[]>> {
        const data = get(orderStore);
        return {
            currentPage: paginatedQuery.page,
            data,
            numberOfPages: 1
        };
    }
    getOne(id: string): MaybePromise<Order> {
        const data = get(orderStore);
        const order = data.find((o) => o.id === id) ?? data[0];
        return order;
    }
    modifyOne(
        id: string,
        item: Omit<Order, 'id'>
    ): MaybePromise<{
        id: string;
        id_user: string;
        purchase_datetime: string;
        address: string;
        postal_code: string;
        city: string;
        delivery_status: 'Payed' | 'Confirmed' | 'Shipped' | 'Delivered';
        sold_products: {
            id: string;
            id_order: string;
            price: number;
            quantity: number;
            id_variant: string;
        }[];
    }> {
        throw new Error('Method not implemented.');
    }
    deleteOne(id: string): MaybePromise<{
        id: string;
        id_user: string;
        purchase_datetime: string;
        address: string;
        postal_code: string;
        city: string;
        delivery_status: 'Payed' | 'Confirmed' | 'Shipped' | 'Delivered';
        sold_products: {
            id: string;
            id_order: string;
            price: number;
            quantity: number;
            id_variant: string;
        }[];
    }> {
        throw new Error('Method not implemented.');
    }
    createOne(item: CreateOrder): MaybePromise<Order> {
        const newItem = {
            ...item,
            id: self.crypto.randomUUID(),
            sold_products: item.sold_products.map((s) => {
                return { ...s, id: self.crypto.randomUUID() };
            })
        };
        orderStore.update((val) => {
            val.push(newItem);
            return val;
        });
        return newItem;
    }
}

const orderService = new MockOrderService();
export default orderService;
