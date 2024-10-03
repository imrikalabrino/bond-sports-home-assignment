import express from 'express';
import {
    getPlayers,
    getPlayerById,
    getPlayerStats,
    searchPlayers,
    getFavorites,
    addFavorite,
    removeFavorite,
    clearFavorites
} from '../controllers/playerController';

const router = express.Router();

router.get('/', getPlayers);
router.get('/search', searchPlayers);
router.get('/favorites', getFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:playerId', removeFavorite);
router.delete('/favorites', clearFavorites);
router.get('/:id', getPlayerById);
router.get('/:id/stats', getPlayerStats);

export default router;
