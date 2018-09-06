import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategoryPost, getPosts } from "../utils/API";
import Post from "./Post";

class Category extends Component {
    state = {
        posts: "",
        sortBy: "timestamp"
    };
    getPostsForCategory(categoryPath = "") {
        if (categoryPath) {
            getCategoryPost(categoryPath).then(posts => {
                this.setState({ posts });
            });
        } else {
            getPosts().then(posts => {
                this.setState({ posts });
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.StateChange !== prevProps.StateChange) {
            this.getPostsForCategory(this.props.categoryPath);
        }
        if (prevProps.categoryPath !== this.props.categoryPath) {
            this.getPostsForCategory(this.props.categoryPath);
        }
    }
    componentDidMount() {
        this.getPostsForCategory(this.props.categoryPath);
    }
    sortBy = (a, b) => {
        return b[this.state.sortBy] - a[this.state.sortBy];
    };
    handleChangeSelect = event => {
        this.setState({ sortBy: event.target.value });
    };
    render() {
        const { posts } = this.state;
        return (
            <div>
                <span>Category.js</span>
                {posts &&
                    posts.sort(this.sortBy).map(post => {
                        return <Post key={post.id} postID={post.id} />;
                    })}
                <select
                    value={this.state.sortBy}
                    onChange={this.handleChangeSelect}
                >
                    <option value="timestamp">timestamp</option>
                    <option value="voteScore">voteScore</option>
                </select>
            </div>
        );
    }
}

function mapStateToProps({ StateChange }, { match }) {
    const categoryPath =
        match && match.params.categoryPath ? match.params.categoryPath : "";
    return {
        match,
        categoryPath,
        StateChange
    };
}
export default connect(mapStateToProps)(Category);
