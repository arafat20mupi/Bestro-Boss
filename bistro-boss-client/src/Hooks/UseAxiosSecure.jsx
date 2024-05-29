import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UseAuth from './UseAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const UseAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = UseAuth()

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {
        const stutus = error.response.stutus;
        if (stutus === 401 || stutus === 403) {
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error);
    });
    return axiosSecure
};

export default UseAxiosSecure;