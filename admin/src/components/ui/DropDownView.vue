<script setup>
import { ref } from 'vue';

const isActive = ref(false) 

</script>
<template>
<div class="dropdown__wrapper">
    <div class="dropdown__header">
        <h3 v-if="!isActive" @click="isActive = true" class="dropdown__title">Развернуть</h3>
        <h3 v-if="isActive" @click="isActive = false"  class="dropdown__title">Свернуть</h3>
    </div> 
    <div v-if="isActive" class="dropdown__body">
        <div class="dropdown__actions">
            Добавить цвет
        </div>

    </div>
</div>


</template>
<style>
.dropdown__wrapper{
    width: 100%;
    padding: 5px 20px;
}
.dropdown__title{
    text-align: right;
    font-size: 19px;
    cursor: pointer;
    text-decoration: underline;
    color: var(--color-sky);
    transition: 0.3s;
}
.dropdown__title:hover{
    transition: 0.3s;
    color: var(--color-solid);
}

</style>