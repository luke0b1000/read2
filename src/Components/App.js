import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Category from "./Category";
import AllCategories from "./AllCategories";
import Posts from "./Posts";
import AddPost from "./AddPosts";

class App extends Component {
    render() {
        return (
            <div>
                <AllCategories />
                <Switch>
                    <Route
                        path="/category/:categoryPath"
                        render={props => <Category {...props} />}
                    />
                    <Route
                        path="/posts/:urlPostID"
                        render={props => <Posts {...props} />}
                    />
                    <Route
                        render={() => (
                            <Fragment>
                                <Category />
                                <AddPost />
                            </Fragment>
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
