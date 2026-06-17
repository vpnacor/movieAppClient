<script setup>
import Navbar from './components/Navbar.vue'



import { useGlobalStore } from './stores/global'
import { onBeforeMount } from 'vue'

const store = useGlobalStore()

onBeforeMount(() => {
  store.getUserDetails(localStorage.getItem('token'))
})
</script>

<template>
  <Navbar/>
  <router-view />
</template>