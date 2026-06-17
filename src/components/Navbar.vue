<script setup>
import { computed } from 'vue';
import { useGlobalStore } from '../stores/global';

const globalStore = useGlobalStore();

const isLoggedIn = computed(() => !!globalStore.user.token);
const isAdmin = computed(() => globalStore.user.email === 'admin@mail.com');
</script>

<template>
  <nav id="techNavbar" class="navbar navbar-expand-lg sticky-top tech-navbar shadow-lg">
    <div id="navbarContainer" class="container navbar-container">

      <button
        class="navbar-toggler custom-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarNav" class="collapse navbar-collapse navbar-collapse-wrapper">
        <div id="navbarItemContainer" class="navbar-nav ms-auto align-items-lg-center nav-links-container">

          <!-- Guest links -->
          <template v-if="!isLoggedIn">
            <router-link :to="{ name: 'Home' }" class="nav-link custom-link">Home</router-link>
            <router-link :to="{ name: 'Register' }" class="nav-link custom-link">Register</router-link>
            <router-link :to="{ name: 'Login' }" class="nav-link auth-btn ms-lg-2">Login</router-link>
          </template>

          <!-- Admin links -->
          <template v-else-if="isAdmin">
            <router-link :to="{ name: 'Home' }" class="nav-link custom-link">Home</router-link>
            <router-link :to="{ name: 'Movie' }" class="nav-link custom-link">Dashboard</router-link>
            <router-link :to="{ name: 'Add Movie' }" class="nav-link custom-link">Add Movie</router-link>
            <router-link :to="{ name: 'Logout' }" class="nav-link logout-btn ms-lg-2">Logout</router-link>
          </template>

          <!-- Regular user links -->
          <template v-else>
            <router-link :to="{ name: 'Home' }" class="nav-link custom-link">Home</router-link>
            <router-link :to="{ name: 'Movie' }" class="nav-link custom-link">Movie</router-link>
            <router-link :to="{ name: 'Logout' }" class="nav-link logout-btn ms-lg-2">Logout</router-link>
          </template>

        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>