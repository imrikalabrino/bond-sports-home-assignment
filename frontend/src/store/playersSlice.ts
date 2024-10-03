import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchPlayers, searchPlayers} from '../services/api';
import {Player} from '../types';

interface PlayersState {
    data: Player[];
    next_cursor: string | null;
    loading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: PlayersState = {
    data: [],
    next_cursor: null,
    loading: false,
    error: null,
    searchQuery: '',
};

export const getPlayers = createAsyncThunk(
    'players/getPlayers',
    async (cursor: string | null) => {
        return await fetchPlayers(cursor);
    }
);

export const searchPlayersThunk = createAsyncThunk(
    'players/searchPlayers',
    async (query: string) => {
        if (query.trim() === '') {
            const response = await fetchPlayers(null);
            return { response, query: '' };
        }
        const response = await searchPlayers(query);
        return { response, query };
    }
);

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.searchQuery = '';
            state.data = [];
            state.next_cursor = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPlayers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPlayers.fulfilled, (state, action) => {
                state.loading = false;
                if (action.meta.arg === null) {
                    state.data = action.payload.data;
                } else {
                    const existingIds = new Set(state.data.map((player) => player.id));
                    const newData = action.payload.data.filter((player) => !existingIds.has(player.id));
                    state.data = [...state.data, ...newData];
                }
                state.next_cursor = action.payload.meta.next_cursor;
            })
            .addCase(getPlayers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch players';
            })
            .addCase(searchPlayersThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchPlayersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.response.data;
                state.next_cursor = action.payload.response.meta.next_cursor;
                state.searchQuery = action.payload.query;
            })
            .addCase(searchPlayersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search players';
            });
    },
});

export const { clearSearch } = playersSlice.actions;
export default playersSlice.reducer;
