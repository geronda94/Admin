<script setup>
import { ref,computed } from 'vue';
import Sidebar from './components/Sidebar/Sidebar.vue';

const lang = ref('en');

const languages = {
  en: { name: 'English', flag:'gb.svg' },
  ru: { name: 'Русский',  flag:'ru.svg' },
  ua: { name: 'Українська', flag:'ru.svg'  },
  tr: { name: 'Türkçe', flag:'tr.svg' },
};

// Пример использования
const switchLanguage = (language) => {
  if (languages[language]) {
    lang.value = language;
  }
};

// Получение текущего названия языка
const currentLanguageName = computed(() => languages[lang.value]?.name);



</script>

<template>
  <div class="wrapper">
      <div class="sidebar">
        <Sidebar />
      </div>
      <container class="container__main">
        <!-- <router-view/> -->
      </container>
    
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
