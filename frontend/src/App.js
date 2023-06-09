import React from 'react';
import {useNavigate} from 'react-router-dom';
import {OktaAuth, toRelativeUrl} from '@okta/okta-auth-js';
import {Security} from '@okta/okta-react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Dropdown from './components/mainPage/Dropdown'
import Contents from "./components/mainPage/Contents";

import config from './auth/oktaConfig';
import Routes from './auth/Routes';
import {configureStore} from "@reduxjs/toolkit";

import rootReducer from './redux/reducers/index';

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});


const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
    const navigate = useNavigate();

    const restoreOriginalUri = (_oktaAuth, originalUri) => {
        navigate(toRelativeUrl(originalUri || '/', window.location.origin));
    };
    return (
        <Provider store={store}>
            <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
                <main>
                    <Dropdown/>
                    <Contents/>
                    <Routes/>
                </main>
            </Security>
        </Provider>
    );
};

export default App;
