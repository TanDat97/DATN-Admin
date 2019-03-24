import axios from 'axios';

import { authHeader } from '../_helpers';
import { Host } from './host';

export const userService = {
    login,
    logout,
    getAll,
    getOne,
    update,
    delete: _delete,
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

function getOne(id) {
    return new Promise((resolve,reject) => {
        axios.get(Host + '/manageAccount/' + id, {headers: authHeader()})
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

function update(id, account) {
    return new Promise((resolve,reject) => {
        axios.patch(Host + '/manageAccount/' + id, account, {headers: authHeader()})
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

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return new Promise((resolve,reject) => {
        axios.delete(Host + '/manageAccount/' + id, {headers: authHeader()})
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

// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`/users/register`, requestOptions).then(handleResponse);
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
