import { apiClient } from '../utils/apiClient';
import { inMemoryCache } from '../utils/inMemoryCache';
import {EnhancedPlayer, Player} from '../models/Player';
import { PlayerStats } from '../models/PlayerStats';
import { PaginatedResponse, SingleResponse } from '../models/ApiResponse';
import {getTeamColors} from "../utils/teamColors";

export class PlayerService {
    private favorites: number[] = []; // Mock database for favorites

    async getPlayers(cursor: string | null = null, perPage: number = 25, search: string = ''): Promise<PaginatedResponse<EnhancedPlayer>> {
        const cacheKey = `players:${cursor}:${perPage}:${search}`;
        const cachedData = await inMemoryCache.get(cacheKey);

        if (cachedData) {
            return cachedData;
        }

        const response = await apiClient.get<PaginatedResponse<Player>>('/players', {
            params: { cursor, per_page: perPage, search },
        });

        const enhancedPlayers = response.data.map(player => ({
            ...player,
            teamColors: getTeamColors(player.team.full_name)
        }));

        const enhancedResponse = {
            ...response,
            data: enhancedPlayers
        };

        await inMemoryCache.set(cacheKey, enhancedResponse, 300);

        return enhancedResponse;
    }

    async getPlayerById(id: number): Promise<EnhancedPlayer> {
        const cacheKey = `player:${id}`;
        const cachedData = await inMemoryCache.get(cacheKey);

        if (cachedData) {
            return cachedData;
        }

        const player = await apiClient.get<Player>(`/players/${id}`);
        const enhancedPlayer = {
            ...player,
            teamColors: getTeamColors(player.team.full_name)
        };

        await inMemoryCache.set(cacheKey, enhancedPlayer, 300);

        return enhancedPlayer;
    }

    async getPlayerStats(playerId: number): Promise<PlayerStats | null> {
        const cacheKey = `player:${playerId}:stats`;
        const cachedData = await inMemoryCache.get(cacheKey);

        if (cachedData) {
            return cachedData;
        }

        const currentYear = new Date().getFullYear();
        const currentSeason = currentYear - (new Date().getMonth() < 9 ? 1 : 0);

        try {
            const response = await apiClient.get<{ data: PlayerStats[] }>('/season_averages', {
                params: {
                    season: currentSeason,
                    player_ids: [playerId]
                },
            });

            if (response.data.length === 0) {
                console.log(`No stats found for player ${playerId} in season ${currentSeason}`);
                return null;
            }

            const stats = response.data[0];

            await inMemoryCache.set(cacheKey, stats, 300);

            return stats;
        } catch (error) {
            console.error(`Error fetching stats for player ${playerId}:`, error);
            throw error;
        }
    }

    async searchPlayers(name: string): Promise<PaginatedResponse<Player>> {
        return this.getPlayers(null, 25, name);
    }

    getFavorites(): number[] {
        return this.favorites;
    }

    addFavorite(playerId: number): void {
        if (!this.favorites.includes(playerId)) {
            this.favorites.push(playerId);
        }
    }

    removeFavorite(playerId: number): void {
        this.favorites = this.favorites.filter(id => id !== playerId);
    }

    clearFavorites(): void {
        this.favorites = [];
    }
}

export const playerService = new PlayerService();
