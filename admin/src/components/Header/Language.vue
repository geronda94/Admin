<script setup>
import { inject, ref, computed } from 'vue';
import LangItem from './LangItem.vue';

const lang = inject('lang');
const dropdownActive = ref(false);

const languages = {
  en: { name: 'English', title:'Language', flag:'/flags/gb.svg' },
  ru: { name: 'Русский', title:'Язык',   flag:'/flags/ru.svg' },
  ua: { name: 'Українська', title:'Мова',  flag:'/flags/ua.svg'  },
  tr: { name: 'Türkçe', title:'Dil',  flag:'/flags/tr.svg' },
  ro: { name: 'Română', title: 'Limba', flag: '/flags/ro.svg' }, // Румынский
  it: { name: 'Italiano', title: 'Lingua', flag: '/flags/it.svg' }, // Итальянский
  es: { name: 'Español', title: 'Idioma', flag: '/flags/es.svg' }, // Испанский
  fr: { name: 'Français', title: 'Langue', flag: '/flags/fr.svg' }, // Французский
  ar: { name: 'العربية', title: 'اللغة', flag: '/flags/ar.svg' } // Арабский
};
const toggleDropdown = () => {
    dropdownActive.value = !dropdownActive.value;
};

const setLanguage = (selectedLang) => {
    lang.value = selectedLang;
    dropdownActive.value = false;
}

// Вычисляемое свойство для определения стиля текста
const textColor = computed(() => {
    return dropdownActive.value ? 'var(--color-sky)' : 'var(--color-primary)'; // Цвет текста
});

// Вычисляемое свойство для поворота стрелки
const arrowRotation = computed(() => {
    return dropdownActive.value ? 'rotate(180deg)' : 'rotate(0deg)'; // Поворот стрелки
});
</script>

<template>
    <div class="lang__block">
        <div class="lang__wrapper" @click="toggleDropdown" :style="{ color: textColor, transition: '0.3s' }">
            <LangItem
                :flag="languages[lang].flag"
                :name="languages[lang].name"
                :title="languages[lang].title"
            />
            <div class="toggler__lang" :style="{ transform: arrowRotation }">
                <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.47763 0.300601L6.07238 4.88584L10.6576 0.291085L12.0691 1.70962L6.07532 7.71584L0.069099 1.72206L1.47763 0.300601Z" fill="currentColor"/>
                </svg>
            </div>
        </div>

        <div :class="['dropdown__wrapper', {'dropdown__active':dropdownActive}]" >
            <div class="lang__item" v-for="(item, key) in languages" @click="setLanguage(key)" :key="key">
                <div class="lang__wrapper lang__wrapper-dropdown" v-if="key !== lang">
                    <LangItem :flag="item.flag" :name="item.name" :title="item.title" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.lang__wrapper {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
    font-family: 'Open Sans';
    cursor:pointer;
}

.lang__block {    
    position: relative;
}

.lang__block, .lang__wrapper, .dropdown__wrapper {
    width: 170px;
}

.dropdown__wrapper {
    background: #E5E5E5 !important;
    height: 0;
    position: absolute;
    left: 0;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    align-items: flex-start;
    z-index: -1;
    opacity: 0;
    transition: 0.5s;
    padding:15px 5px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}

.dropdown__active {
    z-index: 99;
    opacity: 1;
    height: auto;
    transition: 0.5s;
}

.lang__wrapper-dropdown {
    margin-top: 15px;
}
.lang__wrapper-dropdown:hover{
    color: var(--color-sky);
    transition: 0.3;
}
/* Добавьте анимацию для плавного поворота стрелки */
.toggler__lang {
    transition: transform 0.3s ease; /* Плавный переход для ротации */
}
</style>
