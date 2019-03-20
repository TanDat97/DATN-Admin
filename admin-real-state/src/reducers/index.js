import { combineReducers } from 'redux';
import users from './users';
import estates from './estates';


const appReducers = combineReducers({
    users,
    estates,
});

export default appReducers;