<script setup>
import {  useGlobalStore } from '../stores/global';
import { watch, ref, onBeforeMount } from 'vue';
import {useRouter} from 'vue-router';
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import api from '../api.js';




const notyf = new Notyf();

const store = useGlobalStore();
const getUserDetails = store.getUserDetails;

const router = useRouter();


const email = ref("");
const password = ref("");
const isEnabled = ref(false);

onBeforeMount(()=>{
        if(store.user.token){
            router.push({name: 'Home'})
        }
    })


watch([email,password], (currentValue,oldValue) => {

    if (currentValue.every(input  => input !== '')){
        isEnabled.value = true
    } else {
        isEnabled.value = false
    }

});


async function handleSubmit(e){
        e.preventDefault();
        try {
            let res = await api.post(`/users/login`, {
           
                email: email.value,
                password: password.value
            })

            if(res.data) {

                notyf.success("Login Successful");

            
                localStorage.setItem("token", res.data.access);

                
                getUserDetails(res.data.access);

                email.value = "";
                password.value = "";

                router.push({path: '/'})
            }
        } catch (e) {
            if(e.response.status === 404 || e.response.status === 401 || e.response.status === 400) {
                
                notyf.error(e.response.data.message);
            } else {
                notyf.error("Login Failed. Please contact administrator.")
            }

        }

    }

    onBeforeMount(() => {
        if (store.user.email) {
            router.push({path: '/'})
        }
    });


</script>

<template>
  <div class="container-fluid login-container">
    <h1 class="my-5 pt-3 text-center login-title">Login Page</h1> 

    <div class="row d-flex justify-content-center login-row">
      <div class="col-md-5 border border rounded-3 mx-auto p-5 login-form-col">
        <form v-on:submit="handleSubmit" class="login-form">

          <!-- Email -->
          <div class="mb-3 login-email">
            <label for="emailInput" class="form-label login-label">Email Address</label>
            <input 
              type="email" 
              class="form-control login-input" 
              id="emailInput" 
              v-model="email"
            />
          </div>

          <!-- Password -->
          <div class="mb-3 login-password">
            <label for="passwordInput" class="form-label login-label">Password</label>
            <input 
              type="password" 
              class="form-control login-input" 
              id="passwordInput"
              v-model="password"
            />
          </div>
          
          <!-- Submit Buttons -->
          <div class="d-grid mt-5 login-actions">
            <button 
              type="submit" 
              class="btn btn-primary btn-block login-btn" 
              v-if="isEnabled"
            >
              Login
            </button>
            <button 
              type="submit" 
              class="btn btn-warning btn-block login-btn-disabled"  
              disabled 
              v-else
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

