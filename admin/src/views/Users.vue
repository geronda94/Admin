<script setup>
import Header from '../components/RouterHeader/RouterHeader.vue';
import { inject } from 'vue';
const lang = inject('lang')

</script>
<template>
    <Header 
        title="Users"
    /> 
        
</template>