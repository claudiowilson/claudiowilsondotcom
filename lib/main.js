'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var AlbumList = require('./albumList.js');
var Index = require('./index.js');
var Contact = require('./contact.js');
var Projects = require('./projects.js');
var BlogIndex = require('./blog.js').Index;
var Blog = require('./blog.js').Blog;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <div id="background">
                    <AlbumList />
                </div>
                <div id="sidebar">
                    <div id="header">
                        <h4>
                            <div className="container">
                                <Link to="/">CLAUDIO <br/>WILSON</Link>
                            </div>
                        </h4>
                    </div>
                    <div className="container">
                        <ul>
                            <li><Link to="/index">About</Link></li>
                            <li><Link to="/blogs">Blog</Link></li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li> <a href="http://www.github.com/claudiowilson" target="_blank">Github</a></li>
                            <li> <a href="http://www.twitter.com/claudiyoh" target="_blank">Twitter</a></li>
                        </ul>
                    </div>
                </div>
                {this.props.children}
            </div>
        );   
    } 
}); 

ReactDOM.render(
    <Router>
        <Route path="/" component={App}>
            <Route path="index" component={Index} />
            <Route path="blogs" component={BlogIndex}>
                <Route path=":blogUrl" component={Blog} />
            </Route>
            <Route path="contact" component={Contact} />
            <Route path="projects" component={Projects} />
        </Route>
    </Router>,
    document.getElementById('app')
);
