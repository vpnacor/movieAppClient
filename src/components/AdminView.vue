<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api";
import { Notyf } from "notyf";

defineProps({ movieData: Array });
const emit = defineEmits(['movie-added']);  

const router = useRouter();
const notyf = new Notyf();
const isSubmitting = ref(false);

const newMovie = ref({
    title: '',
    director: '',
    year: '',
    description: '',
    genre: ''
});

async function handleAddMovie() {
    if (isSubmitting.value) return;
    isSubmitting.value = true;

    try {
        const response = await api.post("/movies/addMovie", {
            title: newMovie.value.title,
            director: newMovie.value.director,
            year: newMovie.value.year,
            description: newMovie.value.description,
            genre: newMovie.value.genre
        });

        if (response.status === 201) {
            emit('movie-added', response.data);  

            newMovie.value = { title: '', director: '', year: '', description: '', genre: '' };

            const modalEl = document.getElementById('addMovieModal');
            if (modalEl) {
                modalEl.classList.remove('show');
                modalEl.style.display = 'none';
                document.body.classList.remove('modal-open');
                document.body.style.removeProperty('padding-right');
                document.body.style.removeProperty('overflow');
            }

            document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

            notyf.success('Movie Added');

            setTimeout(() => {
                router.push({ path: "/movies" });
            }, 300);
        }
    } catch (error) {
        if (error.response?.status === 409) {
            notyf.error(error.response.data.message);
        } else if (error.response) {
            notyf.error('Movie Invalid');
        } else {
            notyf.error("Something went wrong. Please try again.");
        }
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<template>
  <div class="container-fluid wrapper-bg py-5 admin-dashboard-container">
    <div class="container position-relative z-1 admin-dashboard-inner">

      <div class="text-center mb-5 admin-dashboard-header">
        <div class="tech-badge mb-3 text-uppercase tracking-widest admin-dashboard-badge">
          <i class="bi bi-shield-lock-fill me-2"></i> Movie Control
        </div>
        <h1 class="mb-2 admin-dashboard-title" id="page-title">Admin Dashboard</h1>
        <p class="motto mx-auto admin-dashboard-motto">
          It's not who I am underneath, but what I do that defines me.
        </p>

        <!-- Trigger Button -->
        <button
          class="btn custom-btn px-4 py-2 text-uppercase d-inline-flex align-items-center gap-2 mt-3"
          data-bs-toggle="modal"
          data-bs-target="#addMovieModal"
        >
          <i class="bi bi-plus-square-fill"></i>
          <span class="btn btn-bg-primary text-white">Deploy New Movie</span>
        </button>
      </div>

      <!-- Table Card -->
      <div class="card content-card border-0 overflow-hidden shadow-sm admin-dashboard-table-card bg-warning">
        <div class="card-header border-bottom px-4 py-3 admin-dashboard-table-header">
          <span class="text-uppercase tracking-wider text-white font-orbitron small fw-bold">
            Movie Lineup Inventory
            (<span class="text-white">{{ movieData?.length || 0 }}</span> active Movies)
          </span>
        </div>

        <div class="table-responsive admin-dashboard-table-responsive">
          <table class="table custom-dark-table align-middle m-0 admin-dashboard-table">
            <thead>
              <tr class="font-orbitron tracking-wider small text-uppercase admin-dashboard-table-head">
                <th scope="col" class="ps-4">Movie ID</th>
                <th scope="col">Movie Title</th>
                <th scope="col" class="w-30">Director</th>
                <th scope="col">Year</th>
                <th scope="col">Description</th>
                <th scope="col">Genre</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movie in movieData" :key="movie._id" class="movie-row admin-dashboard-movie-row">
                <td class="ps-4 font-orbitron text-muted small admin-dashboard-movie-id">
                  #{{ movie._id ? movie._id.slice(-8).toUpperCase() : 'UNKNOWN' }}
                </td>
                <td class="admin-dashboard-movie-title">
                  <span class="fw-bold text-dark font-orbitron tracking-wider">{{ movie.title }}</span>
                </td>
                <td class="admin-dashboard-movie-director">
                  <p class="mb-0">{{ movie.director }}</p>
                </td>
                <td class="font-orbitron fw-bold text-warning-gold admin-dashboard-movie-year">
                  {{ movie.year }}
                </td>
                <td class="admin-dashboard-movie-description text-dark">
                  {{ movie.description }}
                </td>
                <td class="admin-dashboard-movie-genre">
                  <span class="badge text-uppercase text-dark">{{ movie.genre }}</span>
                </td>
              </tr>

              <tr v-if="!movieData || movieData.length === 0" class="admin-dashboard-empty-row">
                <td colspan="6" class="text-center py-5 motto font-orbitron text-uppercase tracking-wider">
                  <i class="bi bi-clipboard-x fs-3 text-muted d-block mb-2"></i>
                  No Movies Found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>

  <!-- Add Movie Modal -->
  <div class="modal fade" id="addMovieModal" tabindex="-1" aria-labelledby="addMovieModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-dark text-white border border-warning">

        <div class="modal-header border-warning">
          <h5 class="modal-title font-orbitron text-uppercase text-warning" id="addMovieModalLabel">
            <i class="bi bi-plus-square-fill me-2"></i> Deploy New Movie
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label text-uppercase small font-orbitron text-warning">Title</label>
            <input v-model="newMovie.title" type="text" class="form-control bg-black text-white border-secondary" placeholder="Movie title" />
          </div>
          <div class="mb-3">
            <label class="form-label text-uppercase small font-orbitron text-warning">Director</label>
            <input v-model="newMovie.director" type="text" class="form-control bg-black text-white border-secondary" placeholder="Director name" />
          </div>
          <div class="mb-3">
            <label class="form-label text-uppercase small font-orbitron text-warning">Year</label>
            <input v-model="newMovie.year" type="number" class="form-control bg-black text-white border-secondary" placeholder="Release year" />
          </div>
          <div class="mb-3">
            <label class="form-label text-uppercase small font-orbitron text-warning">Genre</label>
            <input v-model="newMovie.genre" type="text" class="form-control bg-black text-white border-secondary" placeholder="e.g. Action, Drama" />
          </div>
          <div class="mb-3">
            <label class="form-label text-uppercase small font-orbitron text-warning">Description</label>
            <textarea v-model="newMovie.description" class="form-control bg-black text-white border-secondary" rows="3" placeholder="Brief description"></textarea>
          </div>
        </div>

        <div class="modal-footer border-warning">
          <button type="button" class="btn btn-outline-secondary text-uppercase" data-bs-dismiss="modal">Cancel</button>
          <button
          type="button"
          class="btn custom-btn text-uppercase px-4"
          @click="handleAddMovie"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
          <i v-else class="bi bi-plus-square-fill me-2 text-warning"></i>
          <button type="button" class="btn btn-outline-secondary text-uppercase text-warning" data-bs-dismiss="modal">{{ isSubmitting ? 'Deploying...' : 'Deploy' }}</button>
        </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
</style>