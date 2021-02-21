import React from 'react';
import './SearchResults.css';
import Tracklist from '../TrackList/TrackList.jsx';

export default class SearchResults extends React.Component{
    constructor(props){
        super();
    }

    render(){
        return (
            <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracks = {this.props.searchResults}/>
            </div>
        );
    }
}