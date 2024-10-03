import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { getPlayers } from '../../store/playersSlice';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import PlayerCard from '../PlayerCard/PlayerCard';
import CollapsedPlayerCardSkeleton from '../PlayerCard/CollapsedPlayerCardSkeleton.tsx';
import './PlayerList.scss';

const PlayerList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, searchQuery } = useSelector((state: RootState) => state.players);
    const scrollRef = useRef<HTMLDivElement>(null);

    useInfiniteScroll(scrollRef);

    useEffect(() => {
        if (data.length === 0 && !searchQuery) {
            dispatch(getPlayers(null));
        }
    }, [dispatch, data.length, searchQuery]);

    const title = searchQuery ? 'Search Results' : 'All Players';

    return (
        <div className="player-list">
            <h2>{title}</h2>
            <div className="player-cards" ref={scrollRef}>
                {data.map((player) => (
                    <PlayerCard key={player.id} player={player}  isLoading={false}/>
                ))}
                {loading && <CollapsedPlayerCardSkeleton />}
            </div>
            {data.length === 0 && !loading && (
                <p>No players found. Try a different search.</p>
            )}
        </div>
    );
};

export default PlayerList;
