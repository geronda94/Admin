<script setup>
import { computed } from 'vue';
const props = defineProps({
    title: String,
    img: String,
    link: String,
    is_active: {
        type: Boolean,
        require: false,
        default: false
    }
})


const imgLink = computed(() => {
    return props.is_active
        ? `/icons/sidebar/${props.img}-active.svg`
        : `/icons/sidebar/${props.img}.svg`;
});

</script>
<template>
    
    <router-link :class="['nav__item', {'nav_active':is_active}]" :to="link">
        <img class="sidebar__icon" :src="imgLink" alt="" >
        <p>{{ title }}</p>
    </router-link>


</template>
<style scoped>
.sidebar__icon{
    width: 20px;
}

</style>