import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'http://192.168.50.115:5000/api'
});

export default clientAxios;