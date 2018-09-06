import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    getPost,
    editPost,
    deletePost,
    votePostUP,
    votePostDOWN
} from "../utils/API";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleStateChange } from "../Actions/StateChange";
import { withRouter } from "react-router-dom";

class Post extends Component {
    state = {
        post: "",
        edit: false,
        voteStatus: false
    };
    getPostFunc = postID => {
        getPost(postID).then(post => {
            this.setState({ post });
        });
    };
    componentDidMount() {
        const { postID } = this.props;
        if (postID) {
            this.getPostFunc(postID);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.voteStatus !== prevState.voteStatus) {
            const { postID } = prevProps;
            this.getPostFunc(postID);
        }
    }
    handleDeletePost = () => {
        deletePost(this.state.post.id).then(() => {
            this.props.toggleStateChange();
            this.props.history.push("/");
        });
    };
    handleEditPost = () => {
        this.setState({ edit: true });
    };
    handleUp = () => {
        votePostUP(this.state.post.id).then(() => {
            this.setState(prevState => ({ voteStatus: !prevState.voteStatus }));
        });
    };
    handleDown = () => {
        votePostDOWN(this.state.post.id).then(() => {
            this.setState(prevState => ({ voteStatus: !prevState.voteStatus }));
        });
    };
    handleSavePost = event => {
        event.preventDefault();
        editPost(this.state.post.id, {
            title: this.state.post.title,
            body: this.state.post.body
        }).then(() => this.setState({ edit: false }));
    };
    handleTextPostsChange = event => {
        const newPost = {
            ...this.state.post,
            [event.target.name]: event.target.value
        };
        this.setState({
            post: newPost
        });
    };
    render() {
        const {
            id,
            timestamp,
            title,
            body,
            author,
            category,
            voteScore,
            deleted
        } = this.state.post;
        if (this.state.edit) {
            return (
                <div>
                    <form onSubmit={this.handleSavePost}>
                        <input
                            type="text"
                            onChange={this.handleTextPostsChange}
                            value={this.state.post.title}
                            name="title"
                        />
                        <textarea
                            maxLength="100"
                            placeholder="Posts Body go here"
                            onChange={this.handleTextPostsChange}
                            value={this.state.post.body}
                            name="body"
                        />
                        <button type="submit" disabled={this.state.body === ""}>
                            SAVE
                        </button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <span>Post.js</span>
                    <span>
                        <Link to={`/posts/${id}`}>ID: {`${id}`}</Link>
                    </span>
                    <span>timestamp: {`${timestamp}`}</span>
                    <span>title: {`${title}`}</span>
                    <span>body: {`${body}`}</span>
                    <span>author: {`${author}`}</span>
                    <span>category: {`${category}`}</span>
                    <button onClick={this.handleUp}>UP</button>
                    <span>voteScore: {`${voteScore}`}</span>
                    <button onClick={this.handleDown}>DOWN</button>
                    <span>deleted: {`${deleted}`}</span>
                    <button onClick={this.handleEditPost}>EDIT</button>
                    <button onClick={this.handleDeletePost}>DELETE</button>
                </div>
            );
        }
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleStateChange }, dispatch);
}
export default connect(
    null,
    mapDispatchToProps
)(withRouter(Post));
