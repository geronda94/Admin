<script setup>
import { provide } from 'vue';
import Quit from './Quit.vue';




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


</script>

<template>
    <header class="header">
        <Quit/>
        
    </header>
</template>

<style scoped>
.header{
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding:0 15px;

}
</style>