import { defineStore } from 'pinia';
import { reactive } from 'vue';
import api from '../api.js';

export const useGlobalStore = defineStore('global', () => {

    const user = reactive({
        token: localStorage.getItem('token'),
        email: null
    });

    async function getUserDetails(token) {
    if (!token) {
        user.token = null;
        user.email = null;
        return;
    }

    try {
        const { data } = await api.get('/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        user.token = token;
        user.email = data.user.email;  

    } catch (error) {
        console.error('getUserDetails error:', error);
        user.token = null;
        user.email = null;
        localStorage.removeItem('token');
    }
}


    return {
        user,
        getUserDetails
    };

});