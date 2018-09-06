import React, { Component } from "react";
import Post from "./Post";
import { getCommentsOfPost } from "../utils/API";
import Comment from "./Comment";
import AddComments from "./AddComments";
import { connect } from "react-redux";

class Posts extends Component {
    state = {
        comments: ""
    };
    getComments = () => {
        getCommentsOfPost(this.props.match.params.urlPostID).then(comments => {
            this.setState({ comments });
        });
    };
    componentDidMount() {
        this.getComments();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.StateChange !== this.props.StateChange) {
            this.getComments();
        }
    }
    render() {
        const { comments } = this.state;
        const PostDisplay = <Post postID={this.props.match.params.urlPostID} />;
        const commentList = comments
            ? comments.map(comment => (
                  <Comment key={comment.id} commentID={comment.id} />
              ))
            : "No Comment";
        return (
            <div>
                <span>Posts.js</span>
                {PostDisplay}
                <p>COMMENTS - THERE ARE {`${comments.length}`} COMMENTS</p>
                {comments && commentList}
                <AddComments />
            </div>
        );
    }
}

function mapStateToProps({ StateChange }) {
    return { StateChange };
}
export default connect(mapStateToProps)(Posts);
