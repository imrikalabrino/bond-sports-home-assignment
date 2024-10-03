import { Request, Response, NextFunction } from 'express';
import { playerService } from '../services/playerService';
import { ApiError } from '../middleware/errorHandler';
import { validateNumber, validateString } from '../utils/validators';

export const getPlayers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cursor = req.query.cursor ? validateString(req.query.cursor, 'cursor') : null;
        const perPage = req.query.per_page ? validateNumber(req.query.per_page, 'per_page', 1, 100) : 25;
        const search = req.query.search ? validateString(req.query.search, 'search') : '';

        const players = await playerService.getPlayers(cursor, perPage, search);
        res.json(players);
    } catch (error) {
        next(error);
    }
};

export const getPlayerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = validateNumber(req.params.id, 'id');
        const player = await playerService.getPlayerById(id);
        res.json(player);
    } catch (error) {
        next(error);
    }
};

export const getPlayerStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = validateNumber(req.params.id, 'id');
        const stats = await playerService.getPlayerStats(id);
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

export const searchPlayers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = validateString(req.query.name, 'name');
        const players = await playerService.searchPlayers(name);
        res.json(players);
    } catch (error) {
        next(error);
    }
};

export const getFavorites = (req: Request, res: Response, next: NextFunction) => {
    try {
        const favorites = playerService.getFavorites();
        res.json(favorites);
    } catch (error) {
        next(error);
    }
};

export const addFavorite = (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerId = validateNumber(req.body.playerId, 'playerId');
        playerService.addFavorite(playerId);
        res.status(201).json({ message: 'Favorite added' });
    } catch (error) {
        next(error);
    }
};

export const removeFavorite = (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerId = validateNumber(req.params.playerId, 'playerId');
        playerService.removeFavorite(playerId);
        res.json({ message: 'Favorite removed' });
    } catch (error) {
        next(error);
    }
};

export const clearFavorites = (req: Request, res: Response, next: NextFunction) => {
    try {
        playerService.clearFavorites();
        res.json({ message: 'Favorites cleared' });
    } catch (error) {
        next(error);
    }
};
