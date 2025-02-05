import { env } from '$env/dynamic/public';

export const getPictureUrl = (url: string) =>
    url.startsWith('http') ? url : `${env.PUBLIC_MS_PRODUCT}/pictures/${url}`;
