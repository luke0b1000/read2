import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleInitialCategories } from "../Actions/Categories";
import { Link } from "react-router-dom";

class AllCategories extends Component {
    componentDidMount() {
        this.props.handleInitialCategories();
    }
    render() {
        const { Categories } = this.props;
        return (
            <div>
                <span>AllCategories</span>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {Categories &&
                        Categories.map(category => {
                            return (
                                <li key={category.name}>
                                    <Link to={`/category/${category.name}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ Categories }) {
    return {
        Categories
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ handleInitialCategories }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllCategories);
