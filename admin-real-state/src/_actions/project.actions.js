import { projectConstants } from '../_constants';
import { projectService } from '../_services';
// import { alertActions } from '.';
// import { history } from '../_helpers';

export const projectActions = {
    getAll,
    getOne,
    // delete: _delete,
    // register,
};

function getAll() {
    return dispatch => {
        dispatch(request());
        projectService.getAll()
        .then(result => {
            dispatch(success(result))
        })
        .catch(error => {
            dispatch(failure(error))
        });
    };

    function request() { return { type: projectConstants.GETALL_REQUEST } }
    function success(result) { return { type: projectConstants.GETALL_SUCCESS, result } }
    function failure(error) { return { type: projectConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());
        projectService.getOne(id)
        .then(result => {
            dispatch(success(result))
        })
        .catch(error => {
            dispatch(failure(error))
        });
    };

    function request() { return { type: projectConstants.GETONE_REQUEST } }
    function success(result) { return { type: projectConstants.GETONE_SUCCESS, result } }
    function failure(error) { return { type: projectConstants.GETONE_FAILURE, error } }
}

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         userService.delete(id)
//             .then(
//                 user => { 
//                     dispatch(success(id));
//                 },
//                 error => {
//                     dispatch(failure(id, error));
//                 }
//             );
//     };

//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }



// function register(user) {
//     return dispatch => {
//         dispatch(request(user));

//         userService.register(user)
//             .then(
//                 user => { 
//                     dispatch(success());
//                     history.push('/login');
//                     dispatch(alertActions.success('Registration successful'));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
//     function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }