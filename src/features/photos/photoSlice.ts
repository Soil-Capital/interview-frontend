import { createSlice } from '@reduxjs/toolkit';
import { authApi, PhotoI, photoApi } from '@services';
import * as jose from 'jose';
import type { RootState } from '../../store';

type PhotoState = {
    photo: PhotoI | null;
    thumbnails: PhotoI[];
};

const initialState: PhotoState = { photo: null, thumbnails: [] };

const slice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPhoto: (state, { payload }) => {
            return {
                ...state,
                photo: payload
            };
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(photoApi.endpoints.photos.matchFulfilled, (state, { payload }) => {
            state.thumbnails = payload as any;
        });

        builder.addMatcher(photoApi.endpoints.photo.matchFulfilled, (state, { payload }) => {
            state.photo = payload as any;
        });
    },
});

export const photosReducer = slice.reducer;

export const selectCurrentPhoto = (state: RootState) => state.photos.photo;
export const selectThumbnails = (state: RootState) => state.photos.thumbnails;
export const { setPhoto } = slice.actions;
