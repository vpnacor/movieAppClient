<script setup>
import api from '../api.js';
import { reactive, computed, onMounted } from 'vue';
import AdminView from '../components/AdminView.vue';
import UserView from '../components/UserView.vue';
import { useGlobalStore } from '../stores/global.js';

const globalStore = useGlobalStore();
const user = computed(() => globalStore.user);
const isAdmin = computed(() => globalStore.user?.email === 'admin@mail.com');

const movie = reactive({ data: [], loading: false, error: null });

const fetchMovies = async () => {
  if (!user.value?.token) return;

  movie.loading = true;
  movie.error = null;

  try {
    const { data } = await api.get('/movies/getMovies');
    movie.data = Array.isArray(data) ? data : data.movies ?? [];
  } catch (err) {
    movie.error = err.message ?? 'Failed to fetch movies.';
  } finally {
    movie.loading = false;
  }
};

onMounted(fetchMovies);
</script>

<template>
  <div class="catalog-chassis py-5">
    <div class="container">
      <div class="row min-vh-75 align-items-start">

        <p v-if="movie.loading">Loading movies...</p>
        <p v-else-if="movie.error" class="text-danger">{{ movie.error }}</p>

        <AdminView
          v-else-if="isAdmin"
          :movieData="movie.data"
        />

        <UserView
          v-else
          :movieData="movie.data"
          :isAdmin="isAdmin"   
        />

      </div>
    </div>
  </div>
</template>