import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import SearchResults from '../SearchResults/SearchResults.jsx';
import Playlist from '../Playlist/Playlist.jsx';


class App extends React.Component {
    render() {
        return (
          <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults />
              <Playlist />
              
            </div>
          </div>
        </div>
        );
    }
}

export default App;