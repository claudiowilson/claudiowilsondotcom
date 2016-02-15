'use strict';

var React = require('react');

var Index = React.createClass({
    submitAlbum: function() {
       $.ajax({
            url: '/newalbum',
            dataType: 'json',
            data: {'index': $('#index').val()},
            type: 'POST',
            success: function(data) {
                $('#resultText').text(data.added);
                $('#resultText').show();
                $('#resultText').fadeOut(1500);
            }.bind(this)
        });
    },
    componentDidMount: function() {
        $('#albumSelection').hide();
        $('#albums').autocomplete({
            minLength : 2,
            source: function(request, response) {
                $.ajax({
                    url : "/search/" + request.term,
                    dataType : "json",
                    success : function(data) {
                        response(data.map(function(x) {
                            return {
                                label : x["album"],
                                value : x["album]"],
                                artist : x["artist"],
                                icon : x["image"],
                                index : x["index"]
                            }
                        }));
                    },
                    error: function(result) {
                        $('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
                    }
                });
            },
            select : function(event, ui) {
                $('#albumSelection').show();
                $('#index').val(ui.item.index);
                $('#searchAlbum').text(ui.item.value);
                $('#searchArtist').text(ui.item.artist);
                $('#album').attr('src', ui.item.icon); 
                $('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
            }
        }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li>" )
            .append( '<a><img src="' + item.icon + '" height="50" width="50"><span>' + item.label + '</span><br><span style="font-size:small">' + item.artist + "</span></a>" )
            .appendTo( ul );;
        }
    },
    render: function() {
        return (
            <div className="blogcontainer">
              <div className="hidden">
                <p>Hi, my name is Claudio Wilson. </p>
                <p>I'm a Computer Science student at the University of Texas at Austin and full stack developer.</p>
                <p>Visiting? Leave an album cover of your choice on my background!</p>
                <div id="albumInput">
                    <input id="albums" placeholder="Artist? Album name?" />
                </div>
                <span id="resultText"></span>
                <input type="hidden" id="index" name="index" />
                <div id="albumSelection">
                    <img id="album" height="100" width="100"></img>
                    <div id="albumText">
                        <p className="albumName" id="searchAlbum"></p>
                        <p className="artistName" id="searchArtist"></p>
                    </div>
                    <button id="submitAlbum" onClick={this.submitAlbum}> Submit</button>
                </div>
              </div>
            </div>
        ); 
    }
});

module.exports = Index; 
