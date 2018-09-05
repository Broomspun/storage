import {combineReducers} from 'redux';
import mainReducer from './MianReducer'

const allReducers= combineReducers({
    mainReducer: mainReducer
});

export default allReducers;
