import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import { withRouter } from "react-router-dom";
import { addCommentToPost } from "../utils/API";
import { toggleStateChange } from "../Actions/StateChange";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


class AddComments extends Component {
    state = {
        author: "",
        body: ""
    };
    handleTextChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    clearState = () => {
        this.setState({
            author: "",
            body: ""
        });
    };
    handleSubmitForm = event => {
        event.preventDefault();
        const commentObj = {
            id: uuidv4(),
            timestamp: Date.now(),
            body: this.state.body,
            author: this.state.author,
            parentId: this.props.match.params.urlPostID
        };
        addCommentToPost(commentObj).then(() => {
            this.clearState();
            this.props.toggleStateChange();
        });
    };
    render() {
        const { body, author } = this.state;
        return (
            <div>
                <p>AddComments.js</p>
                <form onSubmit={this.handleSubmitForm}>
                    <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={this.handleTextChange}
                        placeholder="Author"
                    />
                    <textarea
                        name="body"
                        maxLength="100"
                        placeholder="Give your Comments here"
                        onChange={this.handleTextChange}
                        value={body}
                    />
                    <button
                        type="submit"
                        disabled={body === "" || author === ""}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleStateChange }, dispatch);
}
export default connect(
    null,
    mapDispatchToProps
)(withRouter(AddComments));
