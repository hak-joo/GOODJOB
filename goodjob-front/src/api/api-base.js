import Axios from 'axios';
import { API_SERVER } from '../config/config';

export const notLoginedApi = Axios.create({
    baseURL: `${API_SERVER}`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
    },
});
export const loginedApi = Axios.create({
    baseURL: `${API_SERVER}`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
    },
});
