<script setup>
import { ref, computed, provide } from 'vue';
import Sidebar from './components/Sidebar/Sidebar.vue';
import axios from 'axios';



const API = 'http:123.0.0.1:8000/api'
const lang = ref('en');

const languages = {
  en: { name: 'English', flag:'gb.svg' },
  ru: { name: 'Русский',  flag:'ru.svg' },
  ua: { name: 'Українська', flag:'ru.svg'  },
  tr: { name: 'Türkçe', flag:'tr.svg' },
};


const switchLanguage = (language) => {
  if (languages[language]) {
    lang.value = language;
  }
};


const currentLanguageName = computed(() => languages[lang.value]?.name);



const isAuth = ref(false);
const userRole = ref(null);

const handleLogin = async (email, password) => {
  try {
    // Ваша логика аутентификации, например, запрос на сервер
    const userData = await fetchUser(email, password);
    if (userData) {
      isAuthenticated.value = true;
      userRole.value = userData.role_id; // Сохраняем роль пользователя
    }
  } catch (error) {
    console.error('Ошибка входа:', error);
  }
};






provide('lang', lang);
provide('API', API);


</script>

<template>
  <div class="wrapper">
      <div class="sidebar">
        <Sidebar />
      </div>
      <div class="container__main">
        <router-view/>
      </div>
    
  </div>
</template>

<style scoped>

.wrapper{
  width:100%;
  height:100vh;
  background: #E5E5E5;
  display: flex;
  flex-direction: row;
}
.sidebar{
  width: 260px;
  min-height: 100%;
  background: #fff;
}

.container__main{
  min-height: 100%;
  width: calc(100% - 260px);
}

</style>
