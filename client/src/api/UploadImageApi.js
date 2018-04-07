// @flow

import axios, {AxiosPromise} from "axios";
import params from 'configs/params';

export function attemptSaveBottle(data: any) { 
    const formData = new FormData();
    for(let key in data){
        if(key !== "base64File"){
            formData.append(key, data[key])
        }
    }
    
    const token = localStorage.getItem('token');
    
    if(!params.apiUrl) return;
        return axios.request({
            url: `${params.apiUrl}/bottles`,
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`                
            },
            data: formData
        });
    }
