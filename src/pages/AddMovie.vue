<script setup>
    import { ref, onBeforeMount, watch} from "vue";
    import { Notyf } from "notyf";
    import { useRouter } from "vue-router";
    import { useGlobalStore } from "../stores/global";
    import api from "../api";

    const notyf = new Notyf({
        duration: 4000,
        position: { x: 'right', y: 'bottom' },
        types: [
            { type: 'success', background: '#FFD244', className: 'text-dark font-orbitron' },
            { type: 'error', background: '#dc3545', className: 'text-white font-orbitron' }
        ]
    });
    const router = useRouter();
    const { user } = useGlobalStore();

    const title = ref("");
    const director = ref("");
   const year = ref(null);
    const description = ref("");
    const genre = ref("");
    const isEnabled = ref(false);
    const isSubmitting = ref(false);

    async function handleSubmit() {
        if (!isEnabled.value || isSubmitting.value) return;
        
        isSubmitting.value = true;
        const movie = {
            title: title.value,
            director: director.value,
            year: year.value,
            description: description.value,
            genre: genre.value
        };

        try {
            const response = await api.post("/movies/addMovie", movie);

            if (response.status === 201) {
                notyf.success('Movie Added');
                router.push({ path: "/movies" });
            } else {
                notyf.error('Movie Invalid');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                notyf.error(error.response.data.message);
            } else {
                notyf.error("Movie Invalid. Please contact administrator.");
            }
        } finally {
            isSubmitting.value = false;
        }
    }

    watch([title, director, year, description, genre], (currentValue) => {
    const [currtitle, currdirector, curryear, currdescription, currgenre] = currentValue;
    if (
        currtitle.trim() !== "" && 
        currdirector.trim() !== "" && 
        curryear !== null && curryear !== "" &&  
        currdescription.trim() !== "" && 
        currgenre.trim() !== ""
    ) {
        isEnabled.value = true;
    } else {
        isEnabled.value = false;
    }
});

    onBeforeMount(() => {
        if (!user.token) {
            router.push({ path: "/" });
        }
    });






</script>

<template>
  <div class="container-fluid wrapper-bg py-5 deploy-module-container">
    <div class="container position-relative z-1 d-flex flex-column align-items-center deploy-module-inner">
      
      <!-- Page Header -->
      <div class="text-center mb-5 deploy-module-header">
        <h1 class="mb-2 deploy-module-title" id="page-title">Add New Movie</h1>
        <p class="motto mx-auto deploy-module-subtitle">
          "Hope is a good thing, perhaps the best of things, and no good thing ever dies."
        </p>
      </div>

      <!-- Form Card -->
      <div class="card content-card border-0 p-4 p-md-5 w-100 table-container deploy-module-card">
        <form @submit.prevent="handleSubmit" class="deploy-module-form">
          
          <!-- title Field -->
          <div class="mb-4 position-relative deploy-module-name">
            <label for="titleInput" class="form-label font-orbitron text-uppercase small tracking-wider mb-2 deploy-module-label">
              <i class="bi bi-tag-fill me-2 text-warning-gold"></i> Title 
            </label>
            <input 
              type="text" 
              class="form-control custom-input font-jakarta deploy-module-input" 
              id="titleInput" 
              v-model="title" 
              placeholder="e.g., The God Father"
              autocomplete="off"
            />
          </div>

          <!-- Director Field -->
          <div class="mb-4 position-relative deploy-module-description">
            <label for="directorInput" class="form-label font-orbitron text-uppercase small tracking-wider mb-2 deploy-module-label">
              <i class="bi bi-file-earmark-text-fill me-2 text-warning-gold"></i>Director
            </label>
            <input
              class="form-control custom-input font-jakarta deploy-module-textarea"
              id="directorInput"
              v-model="director"
              rows="5"
              placeholder="Director"
            ></input>
          </div>

          <!-- Year Field -->
          <div class="mb-4 position-relative deploy-module-description">
            <label for="yearInput" class="form-label font-orbitron text-uppercase small tracking-wider mb-2 deploy-module-label">
              <i class="bi bi-file-earmark-text-fill me-2 text-warning-gold"></i>Year
            </label>
            <input
              class="form-control custom-input font-jakarta deploy-module-textarea"
              id="yearInput"
              v-model="year"
                type="number"
              placeholder="Year"
            ></input>
          </div>
          

          <!-- Description Field -->
          <div class="mb-4 position-relative deploy-module-description">
            <label for="descriptionInput" class="form-label font-orbitron text-uppercase small tracking-wider mb-2 deploy-module-label">
              <i class="bi bi-file-earmark-text-fill me-2 text-warning-gold"></i>Description
            </label>
            <textarea
              class="form-control custom-input font-jakarta deploy-module-textarea"
              id="descriptionInput"
              v-model="description"
              rows="5"
              placeholder=""
            ></textarea>
          </div>

          <!-- Genre Field -->
          <div class="mb-4 position-relative deploy-module-description">
            <label for="genreInput" class="form-label font-orbitron text-uppercase small tracking-wider mb-2 deploy-module-label">
              <i class="bi bi-file-earmark-text-fill me-2 text-warning-gold"></i>Genre
            </label>
            <input
              class="form-control custom-input font-jakarta deploy-module-textarea"
              id="genreInput"
              v-model="genre"
              type="text"
              placeholder=""
            ></input>
          </div>

        

          <!-- Action Buttons -->
          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-end align-items-stretch mt-4 deploy-module-actions">
            <router-link 
              class="btn secondary-btn px-4 py-3 text-uppercase d-flex align-items-center justify-content-center gap-2 order-2 order-sm-1 deploy-module-cancel" 
              :to="{ name: 'Home' }"
            >
              <i class="bi bi-arrow-left-square"></i>
              <span>Back to Home</span>
            </router-link>

            <button 
              type="submit" 
              class="btn custom-btn px-5 py-3 text-uppercase d-flex align-items-center justify-content-center gap-2 order-1 order-sm-2 deploy-module-submit" 
              :disabled="!isEnabled || isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status"></span>
              <i v-else class="bi bi-cloud-arrow-up-fill"></i>
              <span>{{ isSubmitting ? 'Adding Movie...' : 'Add Movie' }}</span>
            </button>
          </div>

        </form>
      </div>
    
              
    </div>
  </div>
</template>


<style scoped>

</style>