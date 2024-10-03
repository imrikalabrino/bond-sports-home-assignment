import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import PlayerList from './components/PlayerList/PlayerList.tsx';
import FavoritesList from './components/FavoritesList/FavoritesList.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import './App.scss';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="app">
                <div className="nba-app-container">
                    <span className="title">NBA Players index</span>
                    <div className="lists-grid">
                        <div className="player-list-container">
                            <SearchBar/>
                            <PlayerList/>
                        </div>
                        <div className="player-list-container">
                            <FavoritesList/>
                        </div>
                    </div>
                </div>
            </div>
        </Provider>
    );
};

export default App;
