import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useDebounce } from '../../hooks/useDebounce';
import { searchPlayersThunk, clearSearch } from '../../store/playersSlice';
import './SearchBar.scss';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const debouncedQuery = useDebounce(query, 300);

    const handleSearch = useCallback(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(clearSearch());
        } else {
            dispatch(searchPlayersThunk(debouncedQuery));
        }
    }, [debouncedQuery, dispatch]);

    useEffect(() => {
        handleSearch();
    }, [debouncedQuery, handleSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search players..."
                value={query}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBar;
