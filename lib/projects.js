'use strict';

var React = require('react');

var Projects = React.createClass({
    render: function() {
        return (
            <div className="blogcontainer">
                <div>
                    <h3>Claudiowilson.com</h3>
                    <p>The site you are currently viewing has been one of my major projects. Here's the <a href="https://github.com/claudiowilson/claudiowilsondotcom">source</a> on GitHub.</p>
                </div>
                <div>
                    <h3>Liteturn</h3>
                    <p>The 3rd Place Winner for HackTX. This Spark Core, Myo Armband, and Android based hack enabled gesture based turn signals for your bike.
                    We have a <a href="https://www.youtube.com/watch?v=QdmPOHyUchk">video</a> demonstrating the hack, as well as the <a href="https://github.com/kyeah/LiteTurn">source</a>.</p>
                </div>
                <div>
                    <h3>LeagueJS</h3>
                    <p>A popular nodeJS wrapper for the League of Legends API maintained by me. Check it out on <a href="https://www.npmjs.org/package/leagueapi">npm</a> or on <a href="https://github.com/claudiowilson/LeagueJS">GitHub</a>.</p>
                </div>
            </div>
        );
    }
});

module.exports = Projects;
