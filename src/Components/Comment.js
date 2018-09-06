import React, { Component } from "react";
import {
    getComment,
    deleteComment,
    editComment,
    voteCommentUp,
    voteCommentDown
} from "../utils/API";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleStateChange } from "../Actions/StateChange";

class Comment extends Component {
    state = {
        comment: "",
        edit: false,
        voteStatus: false
    };
    getCommentFunc = () => {
        getComment(this.props.commentID).then(comment => {
            this.setState({ comment });
        });
    };
    componentDidMount() {
        this.getCommentFunc();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.voteStatus !== prevState.voteStatus) {
            this.getCommentFunc();
        }
    }
    handleVote = voteUpDown => {
        switch (voteUpDown) {
            case "upVOTE":
                voteCommentUp(this.props.commentID).then(() => {
                    this.setState(prevState => ({
                        voteStatus: !prevState.voteStatus
                    }));
                });
                break;
            case "downVOTE":
                voteCommentDown(this.props.commentID).then(() => {
                    this.setState(prevState => ({
                        voteStatus: !prevState.voteStatus
                    }));
                });
                break;
            default:
                break;
        }
    };
    handleDeleteComment = () => {
        deleteComment(this.state.comment.id).then(() => {
            this.props.toggleStateChange();
        });
    };
    handleEditComment = () => {
        this.setState({ edit: true });
    };
    handleSaveComment = event => {
        event.preventDefault();
        editComment(this.state.comment.id, {
            timestamp: Date.now(),
            body: this.state.comment.body
        }).then(() => this.setState({ edit: false }));
    };
    handleTextPostsChange = event => {
        const newComment = {
            ...this.state.comment,
            body: event.target.value
        };
        this.setState({
            comment: newComment
        });
    };
    render() {
        const {
            id,
            parentId,
            timestamp,
            body,
            author,
            voteScore,
            deleted,
            parentDeleted
        } = this.state.comment;
        if (this.state.edit) {
            return (
                <div>
                    <form onSubmit={this.handleSaveComment}>
                        <textarea
                            maxLength="100"
                            placeholder="Posts Body go here"
                            onChange={this.handleTextPostsChange}
                            value={this.state.comment.body}
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
                    <span>Comment.js</span>
                    <span>
                        ID
                        {`${id}`}
                    </span>
                    <span>
                        parentID
                        {`${parentId}`}
                    </span>
                    <span>
                        timestamp:
                        {`${timestamp}`}
                    </span>
                    <span>
                        body
                        {`${body}`}
                    </span>
                    <span>author {`${author}`}</span>
                    <button onClick={() => this.handleVote("upVOTE")}>
                        UP
                    </button>
                    <span>voteScore {`${voteScore}`}</span>
                    <button onClick={() => this.handleVote("downVOTE")}>
                        DOWN
                    </button>
                    <span>deleted {`${deleted}`}</span>
                    <span>
                        parentDeleted
                        {`${parentDeleted}`}
                    </span>
                    <button onClick={this.handleEditComment}>EDIT</button>
                    <button onClick={this.handleDeleteComment}>DELETE</button>
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
)(Comment);
