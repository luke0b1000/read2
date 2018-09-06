import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import reducers from "./reducers";
import middleware from "./middleware";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducers, middleware);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
