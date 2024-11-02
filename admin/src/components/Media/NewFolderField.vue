<script setup>
import { inject} from 'vue';

const showInputField = inject('showInputField')
const folderName = inject('folderName')
const API = inject('API')
const currentPath  = inject('currentPath')






</script>
<template>
    
    <div v-if="showInputField" class="input__container">
        <input 
            v-model="folderName" 
            @blur="createFolder" 
            type="text" 
            placeholder="Введите название папки"
            @keydown.enter="createFolder"
        />
        <span @click="showInputField=false"  class="folder__link">
            <font-awesome-icon :icon="['fas', 'check']" />
        </span>
        <span @click="showInputField=false"  class="folder__link">
            <font-awesome-icon class="" :icon="['fas', 'xmark']" />
        </span>
        
    </div>
</template>