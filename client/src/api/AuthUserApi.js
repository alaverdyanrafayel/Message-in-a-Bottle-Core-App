// @flow

import axios, {AxiosPromise} from "axios";
import params from 'configs/params';

export function attemptSignUp(data: any) {
    
    if(!params.apiUrl) return;
        return axios.request({
            url: `${params.apiUrl}/auth/register`,
            method: 'POST',
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`                
            },
            data: data
        });
    }

    export function attemptSignIn(data: Object) {
        const token = localStorage.getItem('token');
        
            return axios.request({
                method: 'POST',
                url: `${params.apiUrl}/auth/login`,
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                auth: {
                    username: data.email,
                    password: data.password
                },
                data: data
            });
        }

    export function attemptSocialLogin(data: any) {
        const token = localStorage.getItem('token');
    
        if(!params.apiUrl) return;
            return axios.request({
                url: `${params.apiUrl}/auth/social-login/${data.account}`,
                method: 'POST',
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`                                
                },
                data: data
            });
        }
