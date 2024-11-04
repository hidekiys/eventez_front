import axios from 'axios';
import { parseCookies } from 'nookies';


const { 'eventez.user.token': userToken } = parseCookies()
const { 'eventez.partner.token': partnerToken } = parseCookies()
const token = (userToken) ? userToken : partnerToken;

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 50000
});
if(token){
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}