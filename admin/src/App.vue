<script setup>
import { ref, computed, provide, onMounted } from 'vue';
import Sidebar from './components/Sidebar/Sidebar.vue';
import Login from './components/Auth/Login.vue';
import Header from './components/Header/Header.vue';
import axios from 'axios';



const API = 'http://localhost:8000/api'
const isAuth = ref(false)
const isAdmin = ref(false)
const me = ref()


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





const fetchUserInfo = async () => {
    try {
      const response = await axios.get(API+'/auth/me', {withCredentials: true});      

      if (response.status >= 200 && response.status < 300){
        const userData = me.value  = response.data;
        me.value = userData
        // Проверяем, является ли пользователь администратором (role_id = 2 или 3)
        if (userData.role_id == 2 || userData.role_id == 3) {

          isAdmin.value = true;
        }
      }
    } 
    catch (error) {
      console.error( error);
      isAuth.value = false;
    };
  }

onMounted(() => {
  fetchUserInfo();
});


provide('lang', lang);
provide('API', API);
provide('isAdmin',isAdmin)


</script>

<template>
  <div v-if="!isAdmin" class="wrapper">
     <Login/>       
  </div>  

  <div v-else class="wrapper">
      <div class="sidebar">
        <Sidebar />
      </div>
      <div class="container__main">
        <Header/>
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
