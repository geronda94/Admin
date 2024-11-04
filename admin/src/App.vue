<script setup>
import { ref, reactive, computed, provide, onMounted } from 'vue';
import Sidebar from './components/Sidebar/Sidebar.vue';
import Login from './components/Auth/Login.vue';
import Header from './components/Header/Header.vue';
import axios from 'axios';
import ModalAdd from './components/Modal/ModalAdd.vue';
import MediaModalSelector from './components/Media/MediaModalSelector.vue';

const API = 'http://localhost:8000/api'
const isAuth = ref(false)
const isAdmin = ref(false)
const me = ref()
const lang = ref('ru');
const modalAddActive = ref(false)





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



provide('API', API);
provide('isAdmin',isAdmin)
provide('me',me)
provide('lang', lang);
provide('modalAddActive', modalAddActive);


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

      <ModalAdd />
      <!-- <MediaModalSelector v-if="MediaSelectorActive"/> -->
      
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

.content{
  background: white;
  width: 100%;
  height: 100vh;
}





</style>
