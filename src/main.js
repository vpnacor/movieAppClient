import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css';


// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router';
import { useGlobalStore } from './stores/global';

import Home from './pages/Home.vue'
import Register from './pages/Register.vue'
import Login from './pages/Login.vue'
import Logout from './pages/Logout.vue'
import AddMovie from './pages/AddMovie.vue'
import Movie from './pages/Movie.vue'
import ViewMovie from './pages/ViewMovie.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/addmovie',
            name: 'Add Movie',
            component: AddMovie
        },
        {
            path: '/movies',
            name: 'Movie',
            component: Movie
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout
        },
        {
            path: '/movies/getMovie/:id',   
            name: 'View Movie', 
            component: ViewMovie
        }
    ]
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const globalStore = useGlobalStore();
await globalStore.getUserDetails(globalStore.user.token);

app.mount('#app');