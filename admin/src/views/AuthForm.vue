<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits();

const email = ref('');
const password = ref('');

const handleLogin = () => {
  emit('login', email.value, password.value); // Отправляем данные родителю
};
</script>
<template>
    <form @submit.prevent="handleLogin">
      <input v-model="login" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </template>
  
