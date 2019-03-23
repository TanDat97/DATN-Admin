import axios from 'axios';

import { authHeader } from '../_helpers';
import {Host} from './host';

export const userService = {
    login,
    logout,
    getAll,
    // getById,
    // update,
    // delete: _delete,
    // register,
};

function login(email, password) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
    }
    const postParam = {
        email: email,
        password: password
    };
    return new Promise((resolve,reject) => {
        axios.post(Host + '/admin/login', postParam, headers)
        .then(res => {
            if(res.data.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data));
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err))
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    return new Promise((resolve,reject) => {
        axios.get(Host + '/manageAccount', {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err))
    });
}

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`/users/${id}`, requestOptions).then(handleResponse);
// }

// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`/users/register`, requestOptions).then(handleResponse);
// }

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);;
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(`/users/${id}`, requestOptions).then(handleResponse);
// }

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }
