<script setup>

import api from '../api.js';
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import {  useGlobalStore } from '../stores/global';
import { watch, ref, onBeforeMount  } from 'vue';
import {useRouter} from 'vue-router';

const notyf = new Notyf()
const router = useRouter();
const store = useGlobalStore();

const email = ref("");
const password = ref("");
const verifyPass = ref("");
const isEnabled = ref(false);

onBeforeMount(()=>{
        if(store.user.token){
            router.push({name: 'Home'})
        }
    })


watch([email, password, verifyPass], (currentValue,oldValue) => {

    if (currentValue.every(input  => input !== '' && currentValue[1] ===  currentValue[2])){
        isEnabled.value = true
    } else {
        isEnabled.value = false
    }

});



async function handleSubmit(e){
        e.preventDefault();
        try {
            let res = await api.post(`/users/register`, {
           
                email: email.value,
                password: password.value
            })

            if(res.data) {

                notyf.success(res.data.message);

                email.value = "";
                password.value = "";
                verifyPass.value = "";

                router.push({path: '/login'})
            } else {
                notyf.error(res.data.message);
            }
        } catch (e) {
            console.log(e);

            if (e.response) {
                notyf.error(e.response.data.message);
            } else {
                notyf.error("Cannot connect to server");
            }
        }

    }




</script>


<template><div class="container-fluid register-container">
    <h1 class="my-5 pt-3 text-center register-title">Register Page</h1> 

    <div class="row d-flex justify-content-center register-row">
      <div class="col-md-5 border border rounded-3 mx-auto p-5 register-form-col">
        <form v-on:submit="handleSubmit" class="register-form">


          <!-- Email -->
          <div class="mb-3 register-email">
            <label for="emailInput" class="form-label register-label">Email:</label>
            <input 
              type="email" 
              class="form-control register-input" 
              id="emailInput"
              v-model="email"
            />
          </div>


          <!-- Password -->
          <div class="mb-3 register-password">
            <label for="passwordInput" class="form-label register-label">Password:</label>
            <input 
              type="password" 
              class="form-control register-input" 
              id="passwordInput"
              v-model="password"
            />
          </div>

          <!-- Verify Password -->
          <div class="mb-3 register-verify-password">
            <label for="verifyPassInput" class="form-label register-label">Verify Password:</label>
            <input 
              type="password" 
              class="form-control register-input" 
              id="verifyPassInput"
              v-model="verifyPass"
            />
          </div>

          <!-- Submit Buttons -->
          <div class="d-grid mt-5 register-actions">
            <button 
              type="submit" 
              class="btn btn-primary btn-block register-btn" 
              v-if="isEnabled"
            >
              Register
            </button>
            <button 
              type="submit" 
              class="btn btn-warning btn-block register-btn-disabled"  
              disabled 
              v-else
            >
              Please enter your registration details
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </template>

<style></style>