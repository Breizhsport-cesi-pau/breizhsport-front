import { PUBLIC_MS_USER } from '$env/static/public';
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
                data: {
                    firstname: 'admin',
                    lastname: 'admin',
                    role: UserRole.Admin,
                    id: 1,
                    token: ''
                }
            };
        }
        if (email === 'user@user.com' && password === 'U$ser644') {
            return {
                isLogged: true,
                data: {
                    firstname: 'First',
                    lastname: 'Last',
                    role: UserRole.Customer,
                    id: 2,
                    token: ''
                }
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
class ServiceUser implements IServiceUser {
    async login(email: string, password: string): Promise<LoginInformation> {
        console.log(`${PUBLIC_MS_USER}/login`);
        const response = await fetch(`${PUBLIC_MS_USER}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'content-type': 'application/json'
            }
        });
        const body = await response.json();
        if (response.status === 200) {
            return {
                isLogged: true,
                data: {
                    firstname: body.data.firstname,
                    lastname: body.data.lastname,
                    role: body.data.role,
                    id: body.data.id,
                    token: body.access_token
                }
            };
        }
        return {
            isLogged: false
        };
    }
    signup(user: Omit<User, 'id'>): MaybeAsync<boolean> {
        throw new Error('Method not implemented.');
    }
    logout(): MaybeAsync<void> {
        loginInformationStore.set({ isLogged: false });
        cartStore.set([]);
    }
    getPaginated(paginatedQuery: PaginatedQuery): MaybeAsync<
        PaginatedResult<
            Omit<
                {
                    id: string;
                    firstname: string;
                    lastname: string;
                    password: string;
                    email: string;
                    phone_number: string;
                },
                'password' | 'phone_number'
            >[]
        >
    > {
        throw new Error('Method not implemented.');
    }
    getOne(id: string): MaybeAsync<
        Omit<
            {
                id: string;
                firstname: string;
                lastname: string;
                password: string;
                email: string;
                phone_number: string;
            },
            'password'
        >
    > {
        throw new Error('Method not implemented.');
    }
    modifyOne(
        id: string,
        item: Partial<
            Omit<
                Omit<
                    {
                        id: string;
                        firstname: string;
                        lastname: string;
                        password: string;
                        email: string;
                        phone_number: string;
                    },
                    'password'
                >,
                'id'
            >
        >
    ): MaybeAsync<
        Omit<
            {
                id: string;
                firstname: string;
                lastname: string;
                password: string;
                email: string;
                phone_number: string;
            },
            'password'
        >
    > {
        throw new Error('Method not implemented.');
    }
    deleteOne(id: string): MaybeAsync<
        Omit<
            {
                id: string;
                firstname: string;
                lastname: string;
                password: string;
                email: string;
                phone_number: string;
            },
            'password'
        >
    > {
        throw new Error('Method not implemented.');
    }
    createOne(
        item: Omit<
            Omit<
                {
                    id: string;
                    firstname: string;
                    lastname: string;
                    password: string;
                    email: string;
                    phone_number: string;
                },
                'password'
            >,
            'id'
        >
    ): MaybeAsync<
        Omit<
            {
                id: string;
                firstname: string;
                lastname: string;
                password: string;
                email: string;
                phone_number: string;
            },
            'password'
        >
    > {
        throw new Error('Method not implemented.');
    }
}
const UserService = new ServiceUser();
export default UserService;
