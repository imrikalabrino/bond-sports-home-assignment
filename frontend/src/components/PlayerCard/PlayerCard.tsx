import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Player, PlayerStats } from '../../types';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import { AppDispatch, RootState } from '../../store';
import { fetchPlayerStats } from '../../services/api';
import CollapsedPlayerCardSkeleton from './CollapsedPlayerCardSkeleton';
import ExpandedPlayerCardSkeleton from './ExpandedPlayerCardSkeleton';
import './PlayerCard.scss';

interface PlayerCardProps {
    player: Player;
    isLoading: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isLoading }) => {
    const [expanded, setExpanded] = useState(false);
    const [stats, setStats] = useState<PlayerStats | null>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const favorites = useSelector((state: RootState) => state.favorites.data);
    const isFavorite = favorites.some(fav => fav.id === player.id);

    const toggleExpand = async () => {
        setExpanded(!expanded);
        if (!stats && !detailsLoading && !expanded) {
            setDetailsLoading(true);
            try {
                const playerStats = await fetchPlayerStats(player.id);
                setStats(playerStats);
            } catch (error) {
                console.error('Failed to fetch player stats:', error);
            } finally {
                setDetailsLoading(false);
            }
        }
    };

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavorite) {
            dispatch(removeFavorite(player.id));
        } else {
            dispatch(addFavorite(player));
        }
    };

    if (isLoading) {
        return <CollapsedPlayerCardSkeleton />;
    }

    return (
        <div className={`player-card ${expanded ? 'expanded' : ''}`}>
            <div className="card-header" onClick={toggleExpand}>
                <div className="jersey-wrapper">
                    <div
                        className="jersey-container"
                        style={{
                            backgroundColor: player.teamColors.secondary,
                        }}
                    >
                        <span
                            className="jersey-number"
                            style={{
                                color: player.teamColors.primary,
                            }}
                        >
                            {player.jersey_number}
                        </span>
                    </div>
                    <div
                        className="gradient-fade"
                        style={{
                            background: `linear-gradient(to right, ${player.teamColors.secondary}, rgba(255,255,255,0))`,
                        }}
                    ></div>
                </div>
                <div className="player-info">
                    <span className="player-name">
                        {player.first_name} {player.last_name}
                    </span>
                    <span className="player-details">
                        {player.position} • {player.team.full_name}
                    </span>
                    <span className="player-extra">
                        {player.college} • {player.country}
                    </span>
                </div>
                <button className="favorite-button" onClick={toggleFavorite}>
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            {expanded && (
                detailsLoading ? <ExpandedPlayerCardSkeleton /> : (
                    <div className="card-details">
                    <div className="basic-info">
                        <div className="info-row">
                            <span className="info-label">Height:</span>
                            <span className="info-value">
                                {player.height}"
                            </span>
                            <span className="info-label">Weight:</span>
                            <span className="info-value">{player.weight} lbs</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Draft Year:</span>
                            <span className="info-value">{player.draft_year || 'N/A'}</span>
                            <span className="info-label">Draft Round:</span>
                            <span className="info-value">{player.draft_round || 'N/A'}</span>
                            <span className="info-label">Draft Number:</span>
                            <span className="info-value">{player.draft_number || 'N/A'}</span>
                        </div>
                    </div>
                    {stats && (
                        <div className="player-stats">
                            <h4>Season Averages</h4>
                            <div className="stats-row">
                                <div className="stat-item">
                                    <div className="stat-label">Points</div>
                                    <div className="stat-value">{stats.pts.toFixed(1)}</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Assists</div>
                                    <div className="stat-value">{stats.ast.toFixed(1)}</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Rebounds</div>
                                    <div className="stat-value">{stats.reb.toFixed(1)}</div>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                )
            )}
        </div>
    );
};

export default React.memo(PlayerCard);
