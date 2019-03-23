import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { account } from './account.reducer';
import { alert } from './alert.reducer';

const appReducers = combineReducers({
    authentication,
    account,
    alert
});

export default appReducers;