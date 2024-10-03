import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { clearFavorites, fetchFavorites } from '../../store/favoritesSlice';
import PlayerCard from '../PlayerCard/PlayerCard';
import './FavoritesList.scss';

const FavoritesList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: favorites, loading } = useSelector((state: RootState) => state.favorites);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    if (loading) {
        return <div>Loading favorites...</div>;
    }

    return (
        <div className="favorites-list-container">
            <div className="favorites-header">
                <h2>Favorites</h2>
                {favorites && favorites.length > 0 && (
                    <button
                        className="clear-favorites-button"
                        onClick={() => dispatch(clearFavorites())}
                    >
                        Clear Favorites
                    </button>
                )}
            </div>
            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <>
                    <div className="card-list">
                        {favorites.map(player => (
                            <PlayerCard key={player.id} player={player} isLoading={false}/>
                            )
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default FavoritesList;
