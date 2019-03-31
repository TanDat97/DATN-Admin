import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '.';
// import { history } from '../_helpers';

export const authenticationActions = {
    login,
    logout,
};

function login(email, password) {
    return dispatch => {
        dispatch(request( email ));
        userService.login(email, password)
        .then(user => { 
            dispatch(success(user));
            dispatch(alertActions.success('login success'));
        })
        .catch(error => {
            dispatch(failure(error));
            dispatch(alertActions.error('login fail'));
        });
    };
    function request(email) { return { type: userConstants.LOGIN_REQUEST, email } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return dispatch => {
        dispatch(logout());
    }
    function logout() { return { type: userConstants.LOGOUT } }
}
