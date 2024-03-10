import { api } from '@services';

type PhotoT = {
    title: string;
    url: string;
};

export const photosApi = api.injectEndpoints({
    endpoints: (builder) => ({
        photos: builder.query<PhotoT[], void>({
            query: () => ({
                url: 'photos',
                method: 'GET',
            }),
        }),
    }),
});

export const { usePhotosQuery } = photosApi;

export * from './auth.types';
