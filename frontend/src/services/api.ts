import axios from 'axios';
import { Player, PaginatedResponse, PlayerStats } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchPlayers = async (cursor: string | null = null, perPage: number = 25): Promise<PaginatedResponse<Player>> => {
    const response = await axios.get(`${API_BASE_URL}/players`, {
        params: { cursor, per_page: perPage },
    });
    return response.data;
};

export const getPlayerById = async (id: number): Promise<Player> => {
    const response = await axios.get<Player>(`/api/players/${id}`);
    return response.data;
};

export const searchPlayers = async (query: string): Promise<PaginatedResponse<Player>> => {
    const response = await axios.get(`${API_BASE_URL}/players/search`, {
        params: { name: query },
    });
    return response.data;
};

export const fetchPlayerStats = async (playerId: number): Promise<PlayerStats> => {
    const response = await axios.get(`${API_BASE_URL}/players/${playerId}/stats`);
    return response.data;
};

export const getFavorites = async (): Promise<number[]> => {
    const response = await axios.get(`${API_BASE_URL}/players/favorites`);
    return response.data;
};

export const addFavorite = async (playerId: number): Promise<void> => {
    await axios.post(`${API_BASE_URL}/players/favorites`, { playerId });
};

export const removeFavorite = async (playerId: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/players/favorites/${playerId}`);
};

export const clearFavorites = async (): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/players/favorites`);
};
