'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var AlbumList = require('./public/js/albumList.js');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;


ReactDOM.render(
    <AlbumList />, 
    document.getElementById('background')
);
