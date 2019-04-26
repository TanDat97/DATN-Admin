import axios from 'axios';

import { authHeader } from '../_helpers';
import { Host } from './host';

export const adminService = {
    getOne,
    update,
    changePassword,
    changeAvatar
};


function getOne(id) {
    return new Promise((resolve,reject) => {
        axios.get(Host + '/admin/' + id, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}

function update(admin) {
    return new Promise((resolve,reject) => {
        axios.patch(Host + '/admin', admin, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}

function changePassword(postParam) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/admin/changepassword', postParam, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}

function changeAvatar(postParam) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/admin/changeavatar', postParam, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}
