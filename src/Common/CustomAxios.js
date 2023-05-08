import axios from 'axios';

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config)=> {
    /** Header Setter **/
    if (localStorage.getItem('ch_token')) {
        config.headers = {
            ...config.headers,
            pl: 'F',
            Authorization: 'Bearer ' + localStorage.getItem('ch_token')
        }
    } else {
        config.headers = {
            ...config.headers,
            pl: 'T'
        }
    }

    return config;
}, (error)=> {
    // Do something with request error
    return Promise.reject(error);
  })

export default axiosInstance