import User from '$lib/models/user';
import { expect, test } from 'vitest';

test.each([
    { password: 'K@u1', expected: false },
    { password: 'aaaaa@u1', expected: false },
    { password: 'PPPPPP@1', expected: false },
    { password: 'P@uuuuua', expected: false },
    { password: 'KKKajfu1', expected: false },
    { password: 'Pa$$word8', expected: true }
])('password $password must be $expected', ({ password, expected }) => {
    expect(User.shape.password.safeParse(password).success).toBe(expected);
});
