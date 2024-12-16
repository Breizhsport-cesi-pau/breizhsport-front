import UserSchema from '$lib/models/user';

export const loginSchema = UserSchema.pick({ password: true, email: true });
export type LoginSchema = typeof loginSchema;
