import axios from 'axios';

const BASE_URL = "https://rentify-backend-badal-chowdharys-projects.vercel.app/api";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});
