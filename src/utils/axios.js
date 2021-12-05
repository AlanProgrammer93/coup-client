import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'https://coup-alan.herokuapp.com/api'
});

export default clientAxios;
