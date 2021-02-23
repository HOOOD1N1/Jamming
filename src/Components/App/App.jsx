import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import SearchResults from '../SearchResults/SearchResults.jsx';
import Playlist from '../Playlist/Playlist.jsx';
import Spotify from '../../util/Spotify.js';


class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {searchResults: []
    ,playlistName: 'My own first playlist',
     playlistTracks : [] 
  }
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search=this.search.bind(this);
} 

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track)
    let tracks = this.state.playlistTracks;
    this.setState({playlistTracks: tracks});
  }
  removeTrack(track){
    let filterTrack = this.state.playlistTracks.filter(tracks => tracks.id === track.id);
    this.setState({playlistTracks: filterTrack});
  }
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(() => {
      this.setState({
        playlistName: 'New playlist',
        playlistTracks: []
      })
    });
    

  }
  search(term){
   Spotify.search(term).then(searchResults => {
     this.setState({searchResults: searchResults})
   });
  }

  render() {
        return (
          <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
              <SearchResults searchResults = {this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
              
            </div>
          </div>
        </div>
        );
    }
}

export default App;