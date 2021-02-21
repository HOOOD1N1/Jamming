import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import SearchResults from '../SearchResults/SearchResults.jsx';
import Playlist from '../Playlist/Playlist.jsx';


class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {searchResults: [{name: 'name', artist: 'artist', album: 'album', id: 1},{ name: 'name', artist: 'artist', album: 'album', id: 2},{name: 'name', artist:'artist',album: 'album', id: 3}]
  }
} 

  render() {
        return (
          <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults = {this.state.searchResults}/>
              <Playlist />
              
            </div>
          </div>
        </div>
        );
    }
}

export default App;