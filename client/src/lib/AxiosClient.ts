import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.serverside.fun',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
});

export default instance;
