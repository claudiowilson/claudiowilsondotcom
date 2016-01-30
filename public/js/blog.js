'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Index = React.createClass({
    getInitialState: function() {
       return {blogs:[], showBlog: false} 
    },
    blogClicked: function() {
        this.setState({showBlog: true});
    },
    getBlogs: function() {
        $.ajax({
            url: '/blogs',
            type: 'GET',
            success: function(data) {
                this.setState({blogs: data});
            }.bind(this)
        });
    },
    componentWillMount: function() {
        this.getBlogs();
    },
    render: function() {
        var blogs = this.state.blogs.map(function(post, i) {
            return (
                <tr key={i}>
                    <td>
                        <Link to={"/blogs/" + post.url} onClick={this.blogClicked}>{post.title}</Link>
                    </td>
                    <td>
                        {post.date}
                    </td>
                </tr>
            );
        }.bind(this));
        var index = (
            <div>
                <h2>Posts</h2>
                <table>
                    <tbody>
                        {blogs}
                    </tbody>
                </table>
            </div>
        );
        return (
            <div className="blogcontainer" style={{"overflowY":"scroll"}}>
                {this.props.children || index}
            </div>
        ); 
    }
});

var Blog = React.createClass({
    getInitialState: function() {
        return {content: null}
    },
    getBlogContents: function() {
        return {__html: this.state.content}
    },
    componentWillMount: function() {
        $.ajax({
            url: '/blog/' + this.props.params.blogUrl,
            type: 'GET',
            success: function(data) {
                this.setState({content: data});
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div dangerouslySetInnerHTML={this.getBlogContents()} >
            </div>
        );
    }
}); 

exports.Index = Index;
exports.Blog = Blog;
