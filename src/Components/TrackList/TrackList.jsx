import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track.jsx';

export default class Tracklist extends React.Component{
    constructor(props){
        super();
    }
    render(){
        return (
            <div className="TrackList">
            {
                this.props.tracks.map(track => {
                    return <Track key={track.id} track={track} onAdd={this.props.onAdd} />
                })
            }
            </div>
        );
    }
}