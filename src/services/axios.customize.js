import axios from 'axios';
import nprogress from 'nprogress';

nprogress.configure({
    showSpinner: true,
    trickleSpeed: 100
})

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    nprogress.start()
    if (typeof window != "undefined" && window && window.localStorage && window.localStorage.getItem("access_token")) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("access_token")
    }
    return config;
}, function (error) {
    nprogress.done()
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    if (response.data && response.data.data) {
        nprogress.done()
        return response.data;
    }
    nprogress.done()
    return response;
}, function (error) {
    // Nếu có bug xảy ra thì ném ra data của backend để có thể lấy data cho toast thông báo
    if (error.response && error.response.data) return error.response.data;
    nprogress.done()
    return Promise.reject(error);
});

export default instance