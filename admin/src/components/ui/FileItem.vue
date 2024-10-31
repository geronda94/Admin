<script setup>
import { inject } from 'vue';

const API = inject("API")


const props = defineProps({
    type: String,
    name: String,
    fullPath: String
})

const path = API+'/static/'+props.fullPath
</script>
<template>
    
        <div class="file__item" v-if="type==='folder'">
            <font-awesome-icon class="item__icon" :icon="['fas', 'folder']" />
          <p class="item__name"> {{ name }}</p>
        </div>

        <div class="file__item" v-else>
            <img class="item__icon item__img" :src="path" alt="">
          <p class="item__name"> {{ name}}</p>
        </div>

      
  </template>
<style>
.file__item{
    width: 150px;
    height: 190px;
    border-radius: 12px;
    outline: 1px solid var(--color-blue);
    transition: 0.3s;
}

.item__img{ 
    margin-top: 5px !important;
    max-height: 130px;
    width: auto;
    height: auto;
}

.file__item:hover{
    outline: 1px solid var(--color-prime);
    background: var(--color-blue);
    transition: 0.3s;
}

.item__icon{
    width: 140px;
    height: 140px;
    color: var(--color-grey);
    display: block;
    margin: 0 auto;
    overflow: hidden;
}

.item__icon.item__img {
    width: 100%; /* Заставляем изображение занимать всю ширину контейнера */
    height: 100%; /* Заставляем изображение занимать всю высоту контейнера */
    object-fit: cover; /* Сохраняет пропорции изображения, обрезая лишние части */
}

.item__name{
    text-align: center;
    max-height: 40px; /* Определяем максимальную высоту блока текста */
    overflow: hidden; /* Скрываем лишний текст */
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Обрезаем после 2 строк */
    -webkit-box-orient: vertical;
    line-height: 1.2em; /* Регулируем межстрочный интервал */
    white-space: normal; /* Разрешаем перенос текста */

    user-select: none; /* Современные браузеры */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
}
</style>