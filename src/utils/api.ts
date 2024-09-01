import axios from 'axios';
import { parseCookies } from 'nookies';


const { 'eventez.token': token } = parseCookies()

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000
});
if(token){
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}