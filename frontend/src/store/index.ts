import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './playersSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
    reducer: {
        players: playersReducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
