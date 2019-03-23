import axios from 'axios';

// import { authHeader } from '../_helpers';
import {Host} from './host';

export const projectService = {
    login,
    // logout,
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