// import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
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
        axios.post('http://localhost:3001/users/login', postParam, headers)
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

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`/users`, requestOptions).then(handleResponse);
// }

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
