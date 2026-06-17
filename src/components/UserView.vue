<script setup>
import MovieCard from '../components/MovieCard.vue';


const props = defineProps({
    movieData: { type: Array, default: () => [] }
  });

  
</script>

<template>
  <div class="user-catalog-view catalog-view">
    <div class="row mb-5 catalog-header">
      <div class="col text-center catalog-header-col">
        <h1 class="catalog-title text-uppercase mb-2">Our Movie Catalog</h1>
        <div class="title-accent-bar mx-auto mb-3 catalog-title-bar"></div>
        <p class="catalog-subtitle text-uppercase catalog-subtitle-text">
          Select a movie to begin your movie marathon
        </p>
      </div>
    </div>

    <div class="row g-4 product-matrix catalog-products">
      <MovieCard
        v-for="movie in movieData"
        :key="movie._id || movie.id"
        :movieData="movie"
        class="catalog-movie-item"
      />
    </div>
  </div>
</template>