'use strict';

var React = require('react');
var LazyLoad = require('./../public/bower_components/vanilla-lazyload/dist/lazyload.min.js');

var AlbumList = React.createClass({
    getInitialState: function() {
        return {showAlbum: false, albumKey: 0, albums: []}
    },
    componentWillMount: function() {
        this.firebaseRef = new Firebase('https://glowing-fire-8113.firebaseIO.com/albums');
        this.firebaseRef.on("value", function(dataSnapshot) {
            var albums = [];
            dataSnapshot.forEach(function(album) {
                albums.push(album.val());
            });

            this.setState({
                albums: albums
            });
            var lazyLoad = new LazyLoad({container: document.getElementById('background')});
        }.bind(this));
    },
    handleAlbumClick: function(show, key) {
        this.setState({showAlbum: show, albumKey: key});
    },
    handleCloseClick: function() {
        this.setState({showAlbum: false});
    },
    render: function() {
        var currKey = this.state.albumKey;
        var albums = this.state.albums.map(function(album, i) {
            return (
                <Album key={i}
                selectedAlbum={i}
                image={album.image}
                onAlbumClick={this.handleAlbumClick}
                artist={album.artist}
                location={album.location}
                album={album.album} />
            );
        }.bind(this));
        var albumPop = this.state.showAlbum ? <AlbumPop key={this.state.albums[currKey].selectedAlbum}
                                                albumId={this.state.albums[currKey].id}
                                                image={this.state.albums[currKey].image}
                                                artist={this.state.albums[currKey].artist}
                                                location={this.state.albums[currKey].location}
                                                album={this.state.albums[currKey].album}
                                                onCloseClick={this.handleCloseClick} /> : null;
        return (
            <div>
                <div className="albums">
                    {albums}
                </div>
                {albumPop}
            </div>
        );
    }
});

var Album = React.createClass({
    handleClick: function(key) {
        this.props.onAlbumClick(
            true,
            key
        );
    },
    render: function() {
        return (
            <img onClick={this.handleClick.bind(this, this.props.selectedAlbum)} height="100" width="100" src="../images/preloader.gif" data-original={this.props.image} />
        );
    }
});


var AlbumPop = React.createClass({
    getLocationText: function(location) {
         var text = "Added by someone in ";
         if (location.city) {
          text += location.city + ', ';
         }
         
         if (location.region) {
          text += location.region + ', ';
         }
         
         if (location.country) {
          text += location.country;
         }
         
         return text;
    },
    getInitialState: function() {
        return {songs:[]}
    },
    getSongs: function(albumId) {
       $.ajax({
            url: '/getsongs/' + albumId,
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                this.setState({songs: data});
            }.bind(this)
        });
    },
    componentWillMount: function() {
        this.getSongs(this.props.albumId);
    },
    componentWillReceiveProps: function(nextProps) {
        this.getSongs(nextProps.albumId);
    },
    render: function() {
        var songs = this.state.songs.map(function(song, i) {
            return (
                <div key={i}>
                    <p>{song.title}</p>
                    <audio controls width="600px">
                        <source src={song.preview} type="audio/mp4"/>
                    </audio>
                </div>
            );
        });
        return (
            <div id="albumClick">
                <p onClick={this.props.onCloseClick}>Close</p>
                <img src={this.props.image.replace('100x100', '600x600')} id="album600"/>
                <p className="albumName"> {this.props.album} </p>
                <p className="artistName"> {this.props.artist} </p>
                <p id="location">{this.getLocationText(this.props.location)}</p>
                <hr/>
                <div id="songs">
                    <p style={{"fontSize": "large"}}>Tracks</p>
                    {songs}
                </div>
            </div>

        );
    }
});
module.exports = AlbumList; 
