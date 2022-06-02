import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import axios from "axios";

import Main from "./Entryfile/Main";

// Redux imports
import store from './Redux/Reducers/state';
import { SET_AUTHENTICATED } from './Redux/Reducers/types';
import { getUserData,getUserDatanew, logoutUser } from './Redux/Actions/userActions';

const token = localStorage.getItem("token");

// Setting base URI
axios.defaults.baseURL = process.env.APIENDPOINT

if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getUserData());
    }
}

ReactDOM.render(
    <Provider store={store} >
        <Main />
    </Provider>,
    document.getElementById('app')
);

if (module.hot) { // enables hot module replacement if plugin is installed
    module.hot.accept();
}