import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers:{
        'Content-Type':'application/json',
    },
});


export const fetchBooks = async () =>{
    const response = await api.get('books/');
    return response.data;
};

export const registerUser = async (userData) =>{
    const response = await api.post('auth/registration/', userData);
    return response.data;
};

export default api;