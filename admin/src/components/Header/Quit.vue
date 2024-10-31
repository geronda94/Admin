<script setup>
import {ref, inject, provide, computed} from 'vue'
import axios from 'axios';
 
const isAdmin = inject('isAdmin')
const API = inject('API')
const lang = inject('lang')


const quitLang = {
    en: 'Quit',
    ru: 'Выйти',
    tr: 'Çıkış',
    ua: 'Вийти',
    ro: 'Ieși', // Румынский
    it: 'Uscire', // Итальянский
    es: 'Salir', // Испанский
    fr: 'Quitter', // Французский
    ar: 'خروج' // Арабский
};

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
        <p class="p__quit" @click="Quit">{{ quitLang[lang] }}</p>
    </div>

</template>

<style scoped>
.p__quit{
    cursor: pointer;
    color: var(--color-second);
    transition: 0.3;
    padding: 10px;
    font-size: 19px;
    font-weight: 600;

}

.p__quit:hover{
    color: var(--color-sky);
    transition: 0.3;
}

.exit__block{
    width: 100px;
}
</style>