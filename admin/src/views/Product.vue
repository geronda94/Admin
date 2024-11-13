<script setup>

import Header from '../components/RouterHeader/RouterHeader.vue';
import ProductForm from '../components/Forms/Product.vue';

const props = defineProps({
    title: String
})
</script>

<template>
    <Header 
        :title="title" 
        :modalForm="ProductForm" 
    />
</template>
