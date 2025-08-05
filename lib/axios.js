import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://find-doctor-yzky.onrender.com/api',
});

export default instance;
