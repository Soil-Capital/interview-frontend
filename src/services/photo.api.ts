import { api } from '@services';
import { PhotoI } from './photo.types';
import i18n from 'i18next';


export const photoApi = api.injectEndpoints({
    endpoints: (builder) => ({
        photo: builder.mutation<PhotoI[], string>({
            query: (id: string) => ({
                    url:`photos?id=${id}`,
                    method: 'GET',
                }),
            transformResponse: (response: PhotoI[]) => {
                    i18n.changeLanguage('en');
                    return response;
            },
        }),
        photos: builder.mutation<PhotoI, void>({
            query: () => ({
                url: 'photos',
                method: 'GET',
            }),
        }),
    }),
});

export const { usePhotoMutation, usePhotosMutation } = photoApi;

export * from './auth.types';
