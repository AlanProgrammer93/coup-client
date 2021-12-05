import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'https://coup-alan.herokuapp.com'
});

export default clientAxios;
