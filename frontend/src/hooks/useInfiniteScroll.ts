import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { getPlayers } from '../store/playersSlice';

export const useInfiniteScroll = (scrollRef: React.RefObject<HTMLDivElement>) => {
    const dispatch = useDispatch<AppDispatch>();
    const { next_cursor, loading } = useSelector((state: RootState) => state.players);

    const handleScroll = useCallback(() => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && next_cursor) {
                dispatch(getPlayers(next_cursor));
            }
        }
    }, [dispatch, next_cursor, loading]);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
            return () => scrollContainer.removeEventListener('scroll', handleScroll);
        }
    }, [scrollRef, handleScroll]);
};
