import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const appReducers = combineReducers({
    authentication,
    users,
    alert
});

export default appReducers;