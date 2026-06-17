<script setup>
const props = defineProps({
  movieData: {
    type: Object,
    required: true
  }
});

const placeholderImage = (title) =>
  `https://placehold.co/600x400/1F1D17/FFD244?font=Orbitron&text=${encodeURIComponent(title)}`;

const truncate = (text, length = 100) =>
  text?.length > length ? text.slice(0, length) + '…' : text;
</script>

<template>
  <div class="col-md-4">
    <div class="card p-2 shadow-sm h-100">

      <div class="image-wrapper">
        <img
          class="card-img-top"
          :src="movieData.image || placeholderImage(movieData.title)"
          :alt="movieData.title"
        />
      </div>

      <div class="card-body d-flex flex-column">
        <h4 class="card-title fw-bold">{{ movieData.title }}</h4>
        <p class="text-muted mb-1">{{ movieData.director }}</p>

        <ul class="list-unstyled mt-2 mb-3 small">
          <li><span class="fw-semibold">Year:</span> {{ movieData.year }}</li>
          <li><span class="fw-semibold">Genre:</span> {{ movieData.genre }}</li>
          <li class="mt-1">{{ truncate(movieData.description) }}</li>
        </ul>

        <div class="mt-auto">
          <router-link
            class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
            :to="`/movies/getMovie/${movieData._id}`"
          >
            <i class="bi bi-info-circle"></i>
            Details
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>