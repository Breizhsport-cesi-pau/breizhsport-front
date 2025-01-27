import type { User } from '$lib/models/user';
import UserSchema from '$lib/models/user';
import { cartStore } from '$lib/stores/cart';
import {
	loginInformationStore,
	UserRole,
	type LoginInformation
} from '$lib/stores/login-informations.store';
import type { IService, MaybeAsync, PaginatedQuery, PaginatedResult } from './service';
const data: Omit<User, 'password'>[] = [
	{
		id: '00a1dv45-dx19-2301-2471-223932594567',
		email: 'email@gmail.com',
		firstname: 'First',
		lastname: 'Last',
		phone_number: '0819274635'
	}
];
interface IServiceUser
	extends IService<Omit<User, 'password'>, Omit<User, 'password' | 'phone_number'>> {
	login(email: string, password: string): MaybeAsync<LoginInformation>;
	signup(user: Omit<User, 'id'>): MaybeAsync<boolean>;
	logout(): MaybeAsync<void>;
}
class MockServiceUser implements IServiceUser {
	getPaginated(paginatedQuery: PaginatedQuery) {
		return {
			currentPage: 1,
			data,
			numberOfPages: 1
		};
	}
	getOne(id: User['id']) {
		return data.find((p) => p.id === id) || data[0];
	}
	modifyOne(id: User['id'], item: Partial<Omit<User, 'id'>>) {
		return { ...data[0] };
	}
	deleteOne(id: User['id']) {
		return { ...data[0] };
	}
	createOne(item: Omit<User, 'id'>) {
		return data[0];
	}
	async signup(user: Omit<User, 'id'>) {
		return true;
	}
	login(email: string, password: string): MaybeAsync<LoginInformation> {
		if (email === 'admin@test.com' && password === 'Administrator@64') {
			return {
				isLogged: true,
				data: { firstname: 'admin', lastname: 'admin', role: UserRole.Admin }
			};
		}
		if (email === 'user@user.com' && password === 'U$ser644') {
			return {
				isLogged: true,
				data: { firstname: 'First', lastname: 'Last', role: UserRole.Customer }
			};
		}
		return {
			isLogged: false
		};
	}
	logout(): MaybeAsync<void> {
		loginInformationStore.set({ isLogged: false });
		cartStore.set([]);
	}
}

const UserService = new MockServiceUser();
export default UserService;
