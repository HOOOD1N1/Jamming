import React from 'react';
import './Playlist.css';
import Tracklist from '../TrackList/TrackList.jsx';
export default class Playlist extends React.Component {
    
    constructor(props){
        super();

    }

    render(){
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'}/>
                <Tracklist tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}