<script setup>
import {ref, inject, provide, computed} from 'vue'
import axios from 'axios';
 
const isAdmin = inject('isAdmin')
const API = inject('API')



const Quit = async() =>{
    try{
        const response = await axios.post(API+'/auth/logout',  null, {withCredentials:true});

        if  (response.status >= 200 && response.status < 300){
            isAdmin.value = false;
        }

    }catch(error){
        console.error('Ошибка при выходе из системы:', error);
    }
}


</script>

<template>
    <div class="exit__block">
        <p class="p__quit" @click="Quit">Quit</p>
    </div>

</template>

<style scoped>
.p__quit{
    cursor: pointer;
}
</style>