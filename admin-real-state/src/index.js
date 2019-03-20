import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {createStore, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import appReducers from './_reducers/index';
import App from './App';
import './style/index.css';

const composeEnhancer  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    appReducers,
    composeEnhancer(applyMiddleware(thunk)),
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
serviceWorker.unregister();