<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from "../api";

const router = useRouter();
const movie = reactive({ data: {} });
const isLoading = ref(true);

const placeholderImage = (title) =>
  `https://placehold.co/600x400/1F1D17/FFD244?font=Orbitron&text=${encodeURIComponent(title ?? '')}`;

onBeforeMount(async () => {
  const route = useRoute();
  try {
    const { data } = await api.get(`/movies/getMovie/${route.params.id}`);
    movie.data = data;
  } catch (err) {
    console.error('Failed to fetch movie:', err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="container movie-detail-container py-5">

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center text-muted py-5">
      <div class="spinner-border mb-3" role="status"></div>
      <p>Loading movie details...</p>
    </div>

    <!-- Movie Detail -->
    <div v-else class="row mx-auto gap-4 gap-md-0 movie-detail-row">

      <!-- Movie Image -->
      <div class="col-md-6 movie-detail-image-col">
        <img
          class="img-fluid rounded movie-detail-image"
          :src="movie.data.image || placeholderImage(movie.data.title)"
          :alt="movie.data.title"
        />
      </div>

      <!-- Movie Info -->
      <div class="col-md-6 movie-detail-info-col d-flex flex-column gap-3">

        <div class="d-flex align-items-center gap-2 text-white movie-detail-header">
          <i class="bi bi-film fs-3 movie-detail-icon"></i>
          <h1 class="mb-0 movie-detail-title">{{ movie.data.title }}</h1>
        </div>

        <div>
          <h6 class="movie-detail-label fw-semibold">Director</h6>
          <p class="text-muted mb-0">{{ movie.data.director }}</p>
        </div>

        <div>
          <h6 class="movie-detail-label fw-semibold">Year</h6>
          <p class="text-muted mb-0">{{ movie.data.year }}</p>
        </div>

        <div>
          <h6 class="movie-detail-label fw-semibold">Genre</h6>
          <p class="text-muted mb-0">{{ movie.data.genre }}</p>
        </div>

        <div>
          <h6 class="movie-detail-label fw-semibold">Description</h6>
          <p class="text-muted mb-0">{{ movie.data.description }}</p>
        </div>

        <div v-if="movie.data.price">
          <h6 class="movie-detail-label fw-semibold">Price</h6>
          <p class="movie-detail-price fw-bold mb-0">PHP {{ movie.data.price }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex gap-2 mt-2">
          <router-link
            to="/movies"
            class="btn btn-outline-secondary movie-detail-back-btn"
          >
            <i class="bi bi-arrow-left me-1"></i>
            Back to Catalog
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>