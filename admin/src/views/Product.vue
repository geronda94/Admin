<script setup>
import Header from '../components/RouterHeader/Header.vue';
import { inject } from 'vue';
const lang = inject('lang')

</script>
<template>
    <Header 
        title="Products"
    /> 
        
</template>