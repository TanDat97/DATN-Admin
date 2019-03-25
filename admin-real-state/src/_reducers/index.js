import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { account } from './account.reducer';
import { project } from './project.reducer';
import { alert } from './alert.reducer';

const appReducers = combineReducers({
    authentication,
    account,
    alert,
    project,
});

export default appReducers;