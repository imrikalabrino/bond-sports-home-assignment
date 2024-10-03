import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Player } from '../types';
import * as api from '../services/api';

interface FavoritesState {
    data: Player[];
    loading: boolean;
    error: string | null;
}

const initialState: FavoritesState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async (_, { getState }) => {
        const favoriteIds = await api.getFavorites();
        const { players } = getState() as { players: { data: Player[] } };
        return players.data.filter(player => favoriteIds.includes(player.id));
    }
);

export const addFavorite = createAsyncThunk(
    'favorites/addFavorite',
    async (player: Player) => {
        await api.addFavorite(player.id);
        return player;
    }
);

export const removeFavorite = createAsyncThunk(
    'favorites/removeFavorite',
    async (playerId: number) => {
        await api.removeFavorite(playerId);
        return playerId;
    }
);

export const clearFavorites = createAsyncThunk(
    'favorites/clearFavorites',
    async () => {
        await api.clearFavorites();
    }
);

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;
                const uniquePlayers = new Map<number, Player>();
                action.payload.forEach(player => {
                    uniquePlayers.set(player.id, player);
                });
                state.data = Array.from(uniquePlayers.values());
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch favorites';
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                const exists = state.data.some(player => player.id === action.payload.id);
                if (!exists) {
                    state.data.push(action.payload);
                }
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.data = state.data.filter(player => player.id !== action.payload);
            })
            .addCase(clearFavorites.fulfilled, (state) => {
                state.data = [];
            });
    },
});

export default favoritesSlice.reducer;
