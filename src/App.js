import React, { Component } from "react";
import {createStore, applyMiddleware} from 'redux';
import allReducers from './Reducers/index';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import Main from './Main'

export default class App extends Component{
    render(){
        const store = createStore(allReducers, {}, applyMiddleware(ReduxThunk));//{} ->Initial State
        return(
            <Provider store= {store}>
                <Main/>
            </Provider>
        );
    }
}
