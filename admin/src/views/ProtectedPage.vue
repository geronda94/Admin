<!-- ProtectedPage.vue -->
<template>
    <div v-if="isAuthorized">
      <h1>Protected Page</h1>
      <p>Welcome to the admin area!</p>
    </div>
    <div v-else>
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router'; // Импортируйте vue-router для работы с маршрутами
  
  const route = useRoute();
  const userRole = ref(route.meta.userRole); // Предполагается, что вы передаёте роль пользователя в метаданные маршрута
  
  const isAuthorized = computed(() => {
    // Здесь проверьте роль пользователя
    return userRole.value === 2 || userRole.value === 3; // Пример проверки
  });
  </script>
  