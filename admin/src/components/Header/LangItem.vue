<script setup>


const props = defineProps({
    name: String,
    flag: String,
    title: String
})
</script>

<template>
    <img class="lang__img" :src="flag" alt="">
    <div class="sistem__lang">
        <p class="lang__name">{{ title }} </p>
        <p class="lang__title">{{ name  }}</p>
    </div>
</template>


<style>

.lang__img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.lang__name{
    font-size: 12px;
}

.lang__title{
    font-size: 16px;
    font-weight: 600;
}


</style>